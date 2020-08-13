import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
    selector: 'ngx-srv-360-billing-pie',
    template: `
        <div echarts [options]="options" class="echart"></div>
    `,
})
export class SrvAccountBillingpieComponent implements AfterViewInit, OnDestroy {
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
                    colors.successLight,
                    colors.warningLight,
                    colors.infoLight,
                    colors.dangerLight,
                    colors.primaryLight],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['LWNL', 'USMC', 'LESL', 'LENL', 'LNWL', 'Pin-Elec'],
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                series: [
                    {
                        name: 'Customers',
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 2840, name: 'LWNL'},
                            {value: 2865, name: 'USMC'},
                            {value: 1933, name: 'LESL'},
                            {value: 661, name: 'LUSL'},
                            {value: 169, name: 'LENL'},
                            {value: 109, name: 'LNWL'},
                            {value: 119, name: 'PIN-Elec'},
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


