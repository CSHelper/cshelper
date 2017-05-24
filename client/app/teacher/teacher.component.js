'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './teacher.routes';

export class TeacherComponent {
  /*@ngInject*/
  constructor($http, $state, Auth) {
    'ngInject';

    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    let self = this;

    Auth.getCurrentUser(function (user) {
      self.user = user;
      if (self.user.role !== 'student')
        self.initTutor();
    });
  }

  initTutor() {
    var self = this;
    return this.$http.get('/api/users/students')
      .then(function (res) {
        self.students = res.data;
        return self.students;
      });
  }

  initAttempts() {
    this.currentProblem = -1;
    var self = this;
    this.$http.get('/api/codes/student/' + this.$state.params.userId)
      .then(function (res) {
        self.problems = [];

        if (res.data.length == 0) return;

        let problem = {
          title: res.data[0].title,
          attempts: []
        };

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].isSuccess) {
            res.data[i].class = 'fa-check success';
          } else {
            res.data[i].class = 'fa-times fail';
          }

          if (res.data[i].title !== problem.title) {
            self.problems.push(problem);
            problem = {
              title: res.data[i].title,
              attempts: []
            };
          }

          problem.attempts.push(res.data[i]);
        }
        self.problems.push(problem);
      });
  }

  initClassStats() {
    let self = this;
    if (!this.students) {
      this.initTutor()
        .then(function (students) {
          self.getClassData(students);
        })
    } else {
      this.getClassData(this.students);
    }
  }

  getClassData(students) {
    let self = this;

    self.$http.get('/api/statistics')
      .then(function (res) {
        let stats = res.data;

        self.$http.get('/api/problems')
          .then(function (res) {
            let problems = res.data.problems;
            let problemMap = {
              numToId: {},
              idToNum: {},
              length: problems.length,
              problems
            }

            for (var i = 0; i < problems.length; i++) {
              problemMap.numToId[i] = problems[i]._id;
              problemMap.idToNum[problems[i]._id] = i;
            }

            let data = self.calculateData(students, stats, problemMap);
          });
      });
  }

  calculateData(students, stats, problemMap) {
    let studentStats = new Array(students.length);

    let lastId = -1;
    let astudentStats = [];
    let index = 0;
    for (var i = 0; i < stats.length; i++) {
      if (lastId === -1)
        lastId = stats[i].userId;
      else if (lastId !== stats[i].userId) {
        studentStats[index] = astudentStats;
        astudentStats = [];
        index += 1;
      }

      astudentStats.push(stats[i]);
    }
    studentStats[index] = astudentStats;

    let inProgress = this.initArray(problemMap.length, 0);
    let failed = this.initArray(problemMap.length, 0);
    let completed = this.initArray(problemMap.length, 0);
    let partial = this.initArray(problemMap.length, 0);
    let notAttempt = this.initArray(problemMap.length, 0);

    let scores = this.initArray(5, 0);

    for (var x = 0; x < students.length; x++) {
      let studentData = this.calculateStudentScore(studentStats[x], problemMap);

      scores[studentData.scoreIndex] += 1;
      let stats = studentData.stats;

      for (var y = 0; y < problemMap.length; y++) {
        inProgress[y] += stats.inProgress[y];
        failed[y] += stats.failed[y];
        completed[y] += stats.completed[y];
        partial[y] += stats.partial[y];
        notAttempt[y] += stats.notAttempt[y];
      }
    }

    let graphdata = {
      inProgress: inProgress,
      failed: failed,
      completed: completed,
      partial: partial,
      notAttempt: notAttempt
    }

    this.loadClassStatistics(problemMap.problems, graphdata, scores);
  }

  initArray(length, defaultVal) {
    let arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(defaultVal);
    }
    return arr;
  }

  calculateStudentScore(astudentStats, problemMap) {
    let score = 0;
    let inProgress = this.initArray(problemMap.length, 0);
    let failed = this.initArray(problemMap.length, 0);
    let completed = this.initArray(problemMap.length, 0);
    let partial = this.initArray(problemMap.length, 0);
    let notAttempt = this.initArray(problemMap.length, 1);

    if (astudentStats) {
      let branch = [[inProgress, failed], [completed, partial]]

      for (var i = 0; i < astudentStats.length; i++) {
        let problemIndex = problemMap.idToNum[astudentStats[i].problemId];
        notAttempt[problemIndex] -= 1;
        
        let exceedAttempts = astudentStats[i].attempts >= 3;
        let isSuccess = astudentStats[i].isSuccess;

        let subbranch = branch[isSuccess ? 1 : 0];
        subbranch[exceedAttempts ? 1 : 0][problemIndex] += 1;

        if (exceedAttempts && isSuccess) {
          score += 0.5;
        } else if (exceedAttempts && !isSuccess) {
          score += 0.25;
        } else if (!exceedAttempts && isSuccess) {
          score += 1;
        }
      }
    }

    // console.log(notAttempt);

    let percentage = score / problemMap.length * 100;
    let index = Math.min(Math.max(Math.floor((percentage - 50) / 10), 0), 4);

    return {
      stats: {
        inProgress: inProgress,
        failed: failed,
        completed: completed,
        partial: partial,
        notAttempt: notAttempt
      },
      scoreIndex: index
    }
  }


  initStudentStats() {
    let self = this;
    this.$http.get('/api/statistics/students/' + this.$state.params.userId)
      .then(function (res) {
        self.loadStatistics(res.data);
      });

    this.loadCalendar();
  }

  loadStatistics(data) {
    let inProgress = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let failed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let completed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let partial = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.failedProblems = [];
    let branch = [[inProgress, failed], [completed, partial]]

    for (var i = 0; i < data.length; i++) {
      let date = new Date(data[i].createdAt);
      let subbranch = branch[data[i].isSuccess ? 1 : 0];
      subbranch[data[i].attempts >= 3 ? 1 : 0][date.getMonth()] += 1;
    }

    let series1 = [{
      name: 'In Progress',
      data: inProgress
    }, {
      name: 'Failed',
      data: failed
    }, {
      name: 'Completed',
      data: completed
    }, {
      name: 'Partial Credit',
      data: partial
    }];

    let series2 = [{
      name: 'Problems',
      colorByPoint: true,
      data: [{
        name: 'In Progress',
        y: inProgress.reduce((a, b) => a + b, 0) / data.length
      }, {
        name: 'Failed',
        y: failed.reduce((a, b) => a + b, 0) / data.length,
        sliced: true,
        selected: true
      }, {
        name: 'Completed',
        y: completed.reduce((a, b) => a + b, 0) / data.length
      }, {
        name: 'Partial Credit',
        y: partial.reduce((a, b) => a + b, 0) / data.length
      }]
    }];

    this.loadStudentStatistics(series1, series2);
  }

  loadCalendar() {
    $('#calendar').fullCalendar({
      // put your options and callbacks here
      
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      
      events: [
        {
          title: 'Due: Variable Declarations',
          start: '2017-03-13'
        },
        {
          title: 'Due: Assignments',
          start: '2017-03-15'
        },
        {
          title: 'Due: Printing Variables',
          start: '2017-03-27'
        },
        {
          title: 'Due: Keywords',
          start: '2017-03-29'
        },
        {
          title: 'Lesson: Variables',
          start: '2017-03-06',
          end: '2017-03-11',
          allDay: true
        },
        {
          title: 'Lesson: Operators',
          start: '2017-03-13',
          end: '2017-03-18',
          allDay: true
        },
        {
          title: 'Lesson: Decision Making',
          start: '2017-03-27',
          end: '2017-04-01',
          allDay: true
        }
      ]
    })
  }

  loadStudentStatistics(graphSeries, piechartSeries){
    //Time Graph
    Highcharts.chart('time-graph', {
        chart: {
            type: 'area'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Number of Problems'
            },
            labels: {
                formatter: function () {
                    return this.value ;
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' problems'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: graphSeries
    });




    // Pie chart
    Highcharts.chart('pie-chart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: piechartSeries
    });
  }

  loadClassStatistics(problems, columnChartData, gradeChartData){
    let tasks = [];
    for (var i = 0; i < problems.length; i++) {
      tasks.push(problems[i].title);
    }

    Highcharts.chart('columnChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: tasks
      },
      yAxis: {
        title: {
            text: 'Number of Students'
        },
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'In Progress',
        data: columnChartData.inProgress
      },{
        name: 'Not Attempt',
        data: columnChartData.notAttempt
      }, {
        name: 'Failed',
        data: columnChartData.failed
      }, {
        name: 'Completed',
        data: columnChartData.completed
      }, {
        name: 'Partial Credit',
        data: columnChartData.partial
      }]
    });
    
    Highcharts.chart('gradeColumnBarChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [
          'F',
          'D',
          'C',
          'B',
          'A'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Students'
        }
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Grade',
        data: gradeChartData
      }]
    });
  }
}

export default angular.module('cshelperApp.teacher', [uiRouter])
  .config(routes)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('class', {
    template: require('./subpage/classStatistics.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('attempts', {
    template: require('./subpage/problemAttempts.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('stats', {
    template: require('./subpage/studentStatistics.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .name;
