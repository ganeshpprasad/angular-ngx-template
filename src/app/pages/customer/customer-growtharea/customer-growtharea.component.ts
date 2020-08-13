import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
    selector: 'ngx-customer-360-growth-area',
    template: `
        <div echarts [options]="options" class="echart"></div>
    `,
})
export class CustomerGrowthareaComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;

    constructor(private theme: NbThemeService) {
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [colors.successLight,
                    colors.infoLight,
                    colors.dangerLight,
                    colors.warningLight,
                    colors.successLight,
                    colors.primaryLight],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: echarts.tooltipBackgroundColor,
                        },
                    },
                },
                legend: {
                    data: ['Domestic', 'Commercial'],
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY'],
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: 'Domestic',
                        type: 'line',
                        stack: 'Total count',
                        areaStyle: {normal: {opacity: echarts.areaOpacity}},
                        data: [1200, 1357, 2555, 2811, 2901, 2901, 2901],
                    },
                    {
                        name: 'Commercial',
                        type: 'line',
                        stack: 'Total amount',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                        areaStyle: {normal: {opacity: echarts.areaOpacity}},
                        data: [820, 932, 934, 934, 924, 924, 924],
                    },
                ],
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}
