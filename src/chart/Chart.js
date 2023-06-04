import React, {useState, useEffect, useLayoutEffect} from 'react';
import Header from '../board/component/Header';
import axios from 'axios';
import moment from 'moment';

/* 차트 import */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; 


const AmChart = () => {

    const [writeDate, setWriteDate] = useState([]);
    const [postCntByWriteDate, setPostCntByWriteDate] = useState([]);

    useEffect(() => {
        axios.get("/chart")
        .then(response => {
            setWriteDate(response.data.writeDate);
            setPostCntByWriteDate(response.data.postCntByWriteDate); 
        })
        .catch(error => {
            console.log("failed", error);
        });
    }, [])

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        const generateChartData = () => {
            let chartData = [];

            for(let i=0; i<writeDate.length; i++) {
                let kst = moment(writeDate[i]).format('YYYY-MM-DD'); // 시간 kst 기준

                chartData.push({
                    writeDate: kst,
                    postCntByWriteDate: postCntByWriteDate[i]
                });
            }
            return chartData;
        }

        // Add data
        chart.data = generateChartData();

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "writeDate";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "postCntByWriteDate";
        series.dataFields.categoryX = "writeDate";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
                
        return () => {
            chart.dispose();
        };
      
    }, [writeDate, postCntByWriteDate])

    return (
        <div id="chartdiv" className="chartdiv" style={{ width: "100%", height: "500px", margin: "0 auto"}}></div>
    )

}


const Chart = () => {
    return (
        <div>
            <Header boardTitle="C H A R T" />

            {/* 여기에 차트 그리기 */}
            <AmChart />
            
        </div>
    )
}

export default Chart;