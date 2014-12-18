var app = angular.module('app',['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.directive('newscheduleitem', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        // which markup this directive generates
        template: '<div class="new-schedule-item">' +
            '<div class="campaign-name-container">' +
            '<span><b>{{dict.schedule.campaign}}:&nbsp;</b></span>'+
            '<select class="campaign-name-dd" ng-model="campaignNameDD" ng-options="campaign.name for campaign in campaigns">' +
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
            '<div class="campaign-submit-container">' +
            '<button class="cancel-button" ng-click="cancelSchedule()">{{dict.schedule.cancel}}'+
            '<button ng-click="saveSchedule()">{{dict.schedule.scheduleCampaign}}'+
            '</button>'+
            '</div>' +
            '</div>'
    };
});