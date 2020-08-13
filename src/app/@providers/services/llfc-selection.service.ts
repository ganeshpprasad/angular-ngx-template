import {Injectable} from '@angular/core';
import {ILLFCSelectionService, llfc_groupings, LLFCGrouping} from '../data/llfcselection';

@Injectable()
export class LlfcSelectionService extends ILLFCSelectionService {
    get_dno_area_list(): string[] {
        return [
            'EELC_A',
            'EMEB_B',
            'LOND_C',
            'MANW_D',
            'MIDE_E',
            'NEEB_F',
            'NORW_G',
            'SOUT_H',
            'SEEB_J',
            'SWAE_K',
            'SWEB_L',
            'YELG_M',
            'SPOW_N',
            'HYDE_P',
        ];
    }

    get_dno_connections_list(): string[] {
        return [
            'LV',
            'HV',
            'Hvplus',
            'EHV',
            '132/EHV',
            '132kV',
            '0000',
        ];
    }

    get_duos_tarrif_list(): string[] {
        return [
            'LV Net Non-Dom Non-CT',
            'LV HH Metered',
            'LV Sub HH Metered',
            'HV HH Metered',
            'LV Network Dom',
            'Dom Unrestricted',
            'Dom Two Rate',
            'Small Non-Dom Un',
            'LV Medium Non-Dom',
            'UMS Cat A',
            'UMS Cat B',
            'UMS Cat C',
            'UMS Cat D',
            'UMS Cat_A',
            'UMS Cat_B',
            'UMS Cat_C',
            'UMS Cat_D',
            'LV Net NonDom NonCT',
            'LV Sub HH metered',
            'HV Sub HH Metered',
            'LV N/W Dom',
            'LV N/W Non-Dom Non-CT',
            'Dom Unrestrict',
            'Small Non Dom',
        ];
    }


    get_vol_of_connection_list(): string[] {
        return [
            'LV',
            'LVS',
            'HV',
            'EHV',
        ];
    }

    get_llfc_groupings(): LLFCGrouping[] {
        return llfc_groupings;
    }

    get_llfcs_list(): number[] {
        return this.get_llfc_groupings().map(l => l.llfc);
    }

}
