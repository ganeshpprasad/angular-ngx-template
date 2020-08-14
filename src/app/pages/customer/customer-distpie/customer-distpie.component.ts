import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-customer-360-dist-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class CustomerDistpieComponent implements AfterViewInit, OnDestroy {
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
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Domestic', 'Commercial'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Customers by Dist',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 1004, name: 'MED-Media City' },
              { value: 666, name: '101-Media City' },
              { value: 782, name: '206-Princes Dock' },
              { value: 66, name: '201-The Trafford Centre' },
              { value: 43, name: '205-RHADS Doncaster' },
              { value: 16, name: '204-LIBP Liverpool' },
              { value: 8, name: 'KGM-Kingsmere' },
              { value: 7, name: '202-Barton Sq' },
              // { value: 4, name: 'KGB' },
              // { value: 4, name: 'KGB' },
              // { value: 1, name: 'JAV' },
              // { value: 1, name: 'HIL' },
              // { value: 2, name: 'HAY' },
              // { value: 2, name: 'HEA' },
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
