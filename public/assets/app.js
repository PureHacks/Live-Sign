var app = angular.module('app',['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.directive('newscheduleitem', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        // which markup this directive generates
        template: '<div class="new-schedule-item">' +
            '<div class="campaign-name-container">' +
            '<span><b>{{dict.schedule.campaign}}:&nbsp;</b></span>'+
            '<select class="campaign-name-dd" ng-model="campaignName" ng-options="campaign.name for campaign in campaigns">' +
            '<option value="">{{dict.schedule.selectCampaign}}</option>' +
            '</select>' +
            '</div>' +
            '<div class="campaign-date-container">' +
            '<div class="time-heading"><b>{{dict.schedule.startTime}}</b></div>' +
            '<div class="dropdown">' +
            '<a class="dropdown-toggle" id="startDate" role="button" data-toggle="dropdown" data-target="#" href="">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" data-ng-model="data.startDate">' +
            '<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
            '</div>' +
            '</a>' +
            '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
            '<datetimepicker data-ng-model="data.startDate" data-datetimepicker-config="{ dropdownSelector: \'#startDate\' }">' +
            '</datetimepicker>' +
            '</ul>' +
            '</div>' +
            '<div class="time-heading"><b>{{dict.schedule.endTime}}</b></div>' +
            '<div class="dropdown">' +
            '<a class="dropdown-toggle" id="endDate" role="button" data-toggle="dropdown" data-target="#" href="">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" data-ng-model="data.endDate">' +
            '<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
            '</div>' +
            '</a>' +
            '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
            '<datetimepicker data-ng-model="data.endDate" data-datetimepicker-config="{ dropdownSelector: \'#endDate\' }">' +
            '</datetimepicker>' +
            '</ul>' +
            '</div>' +
            '</div>'+
            '</span>' +



            /*'<span class="time" ng-show="!editTime">' +
            '<span class="date-text"><b>{{dict.schedule.startTime}}:&nbsp;</b><em>{{date | date:"shortTime" }}, {{date | date:"medium" }}</em></span>' +
            '<button class="reveal-date-time" ng-click="revealDateTime(true)">{{dict.schedule.edit}}</button>' +
            '</span>' +

            '<div style="display:inline-block; min-height:290px;">'+
            '<datepicker ng-model="sdt" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker>' +
            '</div>'+

           // '<datetimepicker ng-show="editTime" min-date="minDate" show-weeks="showWeeks" hour-step="hourStep" minute-step="minuteStep" ng-model="date" show-meridian="showMeridian" date-format="dd-MMM-yyyy" date-options="dateOptions" date-disabled="disabled(date, mode)" readonly-time="false"></datetimepicker>' +
           /* '<span ng-controller="EndDateTimePicker" class="time">' +
            '<span class="date-text"><b>{{dict.schedule.endTime}}:&nbsp;</b><em>{{date | date:"shortTime" }}, {{date | date:"shortDate" }}</em></span>' +
            //'<datetimepicker min-date="minDate" show-weeks="showWeeks" hour-step="hourStep" minute-step="minuteStep" ng-model="date" show-meridian="showMeridian" date-format="dd-MMM-yyyy" date-options="dateOptions" date-disabled="disabled(date, mode)" readonly-time="false"></datetimepicker>' +
            '<button class="reveal-date-time" ng-click="revealDateTime(true)">{{dict.schedule.edit}}</button>' +
            '</span>' +
            '</div>' +*/
            '<div class="campaign-submit-container">' +
            '<button ng-click="scheduleCampaign()">{{dict.schedule.scheduleCampaign}}'+
            '</button>'+
            '</div>' +
            '</div>'
    };
});