import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
    selector: 'ngx-srv-360-type-pie',
    template: `
        <div echarts [options]="options" class="echart"></div>
    `,
})
export class SrvAccountTypepieComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;

    constructor(private theme: NbThemeService) {
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [
                    colors.warningLight,
                    colors.infoLight,
                    colors.dangerLight,
                    colors.successLight,
                    colors.primaryLight],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'auto',
                    left: 'left',
                    data: [''],
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                series: [
                    {
                        name: 'Accounts',
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 2052, name: 'Electricity'},
                            {value: 3053, name: 'Cold Water'},
                            {value: 2249, name: 'Hot Water'},
                            {value: 169, name: 'IDNO'},
                            {value: 124, name: 'Elec/Heating/Cooling'},
                            {value: 125, name: 'Mng + Wholesale Chg'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: echarts.itemHoverShadowColor,
                            },
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: echarts.axisLineColor,
                                },
                            },
                        },
                    },
                ],
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}

