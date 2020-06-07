

import "./css/index.css"

import { getProvinces } from "@/util/areaService.js"
import $ from "jquery"


getProvinces().then(res => {
    console.log(res,1)
})