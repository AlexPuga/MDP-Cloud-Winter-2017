/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","app/core/config"],function(a,b){"use strict";var c=a.module("grafana.controllers");c.controller("SelectOrgCtrl",["$scope","backendSrv","contextSrv",function(a,c,d){d.sidemenu=!1,a.init=function(){a.getUserOrgs()},a.getUserOrgs=function(){c.get("/api/user/orgs").then(function(b){a.orgs=b})},a.setUsingOrg=function(a){c.post("/api/user/using/"+a.orgId).then(function(){window.location.href=b.appSubUrl+"/"})},a.init()}])});