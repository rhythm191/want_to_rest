'use strict';

import $ from 'jquery'

// 休みリンクを追加する
function add_rest_link() {
  let $weekdays = $('.weekhead:first .weekday')
  $weekdays.each(function($day) {
    let query = query_to_hash( $(this).find('a').attr('href') );
    let date = date_to_hash( query['Date'] )

    let link_button_html = `
      <span class="entry">
      <form name="AjaxXHRScheduleSimpleEntry" method="POST" action="ag.cgi?" style="display: inline">
        <input type="hidden" name="csrf_ticket" value="${ $('[name=csrf_ticket]').val() }"/>
        <input type="hidden" name="page" value="AjaxXHRScheduleSimpleEntry">
        <input type="hidden" name="Date" value="${ query['Date'] }">
        <input type="hidden" name="BDate" value="${ query['BDate'] }">
        <input type="hidden" name="UID" value="${ uid() }">
        <input type="hidden" name="sUID" value="${ uid() }">
        <input type="hidden" name="ElementId" value="scheduleindex">
        <input type="hidden" name="SetTime.Hour" value="9">
        <input type="hidden" name="SetTime.Minute" value="0">
        <input type="hidden" name="EndTime.Hour" value="22">
        <input type="hidden" name="EndTime.Minute" value="0">
        <input type="hidden" name="SetDate.Year" value="${ date.year }">
        <input type="hidden" name="SetDate.Month" value="${ date.month }">
        <input type="hidden" name="SetDate.Day" value="${ date.day }">
        <input type="hidden" name="Event" value="">
        <input type="hidden" name="Detail" value="test">
        <input type="hidden" name="Memo" value="">
        <input type="hidden" name="Private" value="">
        <input type="hidden" name="Entry" value="1">
        <input type="hidden" name="encoding" value="utf-8">
        <a href="#" class="js_want_to_rest">
         休
        </a>
      </form>
      </span>
      `
    $(this).append(link_button_html)
  });
}

// 建物アイコンをクリックした時に新しいウインドウで空き施設を表示させる
function entry_rest_schedule_mine(e) {
  let $form = $(this).closest('form');
  $.post('ag.cgi', $form.serialize());
 return false;
}

// 検索クエリをHashに変換する
function query_to_hash(queryString) {
  let query = queryString || location.search.replace(/\?/, "");
  return query.split("&").reduce(function(obj, item, i) {
    if(item) {
      item = item.split('=');
      obj[item[0]] = item[1];
      return obj;
    }
  }, {});
}

// 日付文字をHashに変換する
// date {String}  ex. 2017.10.14
function date_to_hash(date) {
  let list = date.split('.')
  return {
    year: list[1],
    month: list[2],
    day: list[3]
  }
}

// 自分のUIDを取得
function uid() {
  let query = query_to_hash($('#usermenu .vr_headerAccount a').first().attr('href') );

  return query['uid'];
}

// 自分の名前を取得
function my_name() {
  return $('#headermenu .yuimenubaritemlabelinner').last().text();
}

add_rest_link();

$('body').on('click', '.js_want_to_rest', entry_rest_schedule_mine);

// sync_selected_buildings();
//
// $.ajax('ag.cgi?page=ScheduleEntry').then(function(response) {
//   let buildings = []
//
//   $(response).find('select[name="FCID"] option').each(function(i, option) {
//     let $option = $(option);
//
//     if($option.val() !== "") {
//       buildings.push({ id: $option.val(), text: $option.text() });
//     }
//   });
//
//   chrome.runtime.sendMessage({ 'buildings': buildings }, function(response) {});
// });
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "setting_update") {
//     sync_selected_buildings();
//   }
// });
