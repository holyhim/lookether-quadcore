import React from 'react';
import { Currentweather } from "./Currentweather"
import { Todayclothes } from "./Todayclothes"
import { Weekweather } from "./Weekweather"
import  "./Contentpage.css"

const Contentpage = () => (
  <div>
	<div class="row">
    <div class="cur-weather"><Currentweather /></div>
    <div class="cloth"><Todayclothes /></div>
  </div>
  <div class="row">
    <div class="weekweather"><Weekweather /></div>
  </div>
	</div>
)

export  {Contentpage};
