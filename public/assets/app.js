var app = angular.module('app',['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.directive('newscheduleitem', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        // which markup this directive generates
        template: '<div class="new-schedule-item">' +
            '<div class="campaign-name-container">' +
            '<span>{{dict.schedule.campaign}}:&nbsp;</span>'+
            '<select class="campaign-name-dd" ng-model="selectedTestAccount" ng-options="campaign.name for campaign in campaigns">' +
            '<option value="">{{dict.schedule.selectCampaign}}</option>' +
            '</select>' +
            '</div>' +
            '<div class="campaign-date-container">' +
            '<span ng-controller="StartDateTimePicker">' +
            '<span class="date-text">{{dict.schedule.startTime}}: <em>{{date | date:"shortTime" }}, {{date | date:"fullDate" }}</em></span>' +
            //'<datetimepicker min-date="minDate" show-weeks="showWeeks" hour-step="hourStep" minute-step="minuteStep" ng-model="date" show-meridian="showMeridian" date-format="dd-MMM-yyyy" date-options="dateOptions" date-disabled="disabled(date, mode)" readonly-time="false"></datetimepicker>' +
            '<button class="reveal-date-time" ng-click="revealDateTime()">{{dict.schedule.edit}}</button>' +
            '</span>' +
            '<span ng-controller="EndDateTimePicker">' +
            '<span class="date-text">{{dict.schedule.endTime}}: <em>{{date | date:"shortTime" }}, {{date | date:"fullDate" }}</em></span>' +
            //'<datetimepicker min-date="minDate" show-weeks="showWeeks" hour-step="hourStep" minute-step="minuteStep" ng-model="date" show-meridian="showMeridian" date-format="dd-MMM-yyyy" date-options="dateOptions" date-disabled="disabled(date, mode)" readonly-time="false"></datetimepicker>' +
            '<button class="reveal-date-time" ng-click="revealDateTime()">{{dict.schedule.edit}}</button>' +
            '</span>' +
            '</div>' +
            '<div class="campaign-submit-container">' +
            '<button ng-click="scheduleCampaign()">{{dict.schedule.scheduleCampaign}}'+
            '</button>'+
            '</div>' +
            '</div>'
    };
});