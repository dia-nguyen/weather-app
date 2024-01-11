"use client";
"use strict";
exports.__esModule = true;
var BackgroundLoader_1 = require("./BackgroundLoader");
var CurrentWeatherBlock_1 = require("./CurrentWeatherBlock");
var CurrentWeatherDetails_1 = require("./CurrentWeatherDetails");
var UserSettings_1 = require("./UserSettings");
var WeeklyForecastBlocks_1 = require("./WeeklyForecastBlocks");
function WeatherAppV2() {
    return (React.createElement("main", { className: "w-full h-screen flex bg-cover bg-center bg-neutral-900" },
        React.createElement("div", { className: "m-auto rounded-lg grid grid-cols-2 w-[750px] relative" },
            React.createElement("div", { className: "relative" },
                React.createElement(BackgroundLoader_1["default"], { size: "small" }),
                React.createElement(CurrentWeatherBlock_1["default"], null)),
            React.createElement("div", { className: "text-white border-[rgba(255,255,255,0.2)] rounded-r border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm" },
                React.createElement(CurrentWeatherDetails_1["default"], null),
                React.createElement(WeeklyForecastBlocks_1["default"], null)),
            React.createElement(UserSettings_1["default"], null))));
}
exports["default"] = WeatherAppV2;
