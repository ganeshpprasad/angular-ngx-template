import {Injectable} from "@angular/core";
import {IFieldAttributes, IMPANDetailsFormService} from "../../data/form-data/mpandetailsform";
import {FormBuilder, FormGroup} from '@angular/forms';
import {IMpanDetailsResponse} from "../../data/mpandetails";


@Injectable()
export class MpanDetailsFormService implements IMPANDetailsFormService {
    // public form: FormGroup;
    public mpan_form: FormGroup;

    private relatedAddressForm = this.fb.group({
        address_type: null,
        address_1: null,
        address_2: null,
        address_3: null,
        address_4: null,
        address_5: null,
        address_6: null,
        address_7: null,
        address_8: null,
        address_9: null,
        post_code: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedMeterClassForm = this.fb.group({
        measurement_class_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatesMpan2Mpid2RoleForm = this.fb.group({
        market_participant_fk: null,
        role_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedLLFCForm = this.fb.group({
        mpan_fk: null,
        line_loss_factor_class_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedMeasurementClassForm = this.fb.group({
        measurement_class_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedEnergisationForm = this.fb.group({
        state_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedMeterForm = this.fb.group({
        meter_fk: null,
        installation_date: null,
        removal_date: null,
    });

    private relatedAscForm = this.fb.group({
        value: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedSscForm = this.fb.group({
        ssc_fk: null,
        effective_from: null,
        effective_to: null,
    });

    private relatedAsset = this.fb.group({
        id: null,
        business_reference: null,
        description: null,
        plot_number: null,
        reference_to_plan: null,
        property_type: null,
        supply_capacity: null,
        supply_voltage: null,
        address: this.fb.group({
            address_type: null,
            address_1: null,
            address_2: null,
            address_3: null,
            address_4: null,
            address_5: null,
            address_6: null,
            address_7: null,
            address_8: null,
            address_9: null,
            post_code: null,
            effective_from: null,
            effective_to: null,
            id: null,
        }),
    });

    private formFieldAttributes: { [key: string]: IFieldAttributes } = {};

    constructor(private fb: FormBuilder) {
        this.mpan_form = this.fb.group({
            id: null,
            customer_name: null,
            energisation: this.relatedEnergisationForm,
            llfc: this.relatedLLFCForm,
            mc: this.relatedMeasurementClassForm,
            asc: this.relatedAscForm,
            ssc: this.relatedSscForm,
            meter: this.relatedMeterForm,
            unmetered: null,
            export: null,
            connection_date: null,
            disconnection_date: null,
            asset: this.relatedAsset,
            //
            mpan_address: this.fb.group({
                address_type: null,
                address_1: null,
                address_2: null,
                address_3: null,
                address_4: null,
                address_5: null,
                address_6: null,
                address_7: null,
                address_8: null,
                address_9: null,
                post_code: null,
                effective_from: null,
                effective_to: null,
            }),
            mailing_address: this.fb.group({
                address_type: null,
                address_1: null,
                address_2: null,
                address_3: null,
                address_4: null,
                address_5: null,
                address_6: null,
                address_7: null,
                address_8: null,
                address_9: null,
                post_code: null,
                effective_from: null,
                effective_to: null,
            }),
            //
            da_mpid: this.fb.group({
                market_participant_fk: null,
                role_fk: null,
                effective_from: null,
                effective_to: null,
            }),
            dc_mpid: this.fb.group({
                market_participant_fk: null,
                role_fk: null,
                effective_from: null,
                effective_to: null,
            }),
            mop_mpid: this.fb.group({
                market_participant_fk: null,
                role_fk: null,
                effective_from: null,
                effective_to: null,
            }),
            supplier_mpid: this.fb.group({
                market_participant_fk: null,
                role_fk: null,
                effective_from: null,
                effective_to: null,
            }),

            //
            ct_ratio: null,
            ct_class: null,
            ct_rating: null,
            vt_ratio: null,
            vt_class: null,
            vt_rating: null,
            umso_reference: null,
            unique_property_reference_number: null,
        });
        this.setFieldAttributes();
    }

    private setFieldAttributes() {

        this.formFieldAttributes['mpan.id'] = {
            label: 'MPAN ID',
            placeholder: '',
            tooltip: '',
            isReadOnly: true,
            formControlName: 'id',
        };
        this.formFieldAttributes['mpan.customer_name'] = {
            label: 'Customer Name',
            placeholder: '',
            tooltip: '',
            isReadOnly: true,
            formControlName: 'customer_name',
        };
        this.formFieldAttributes['energisation.state_fk'] = {
            label: 'Energisation Status',
            placeholder: 'energisation status',
            tooltip: 'Code for the energisation status',
            isReadOnly: false,
            formControlName: 'state_fk',
        };
        this.formFieldAttributes['energisation.effective_from'] = {
            label: 'Effective Date',
            placeholder: 'effective date of energisation',
            tooltip: 'Effective date of new energisation status',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        this.formFieldAttributes['llfc.line_loss_factor_class_fk'] = {
            label: 'Line Loss Factor Class',
            placeholder: 'LLFC class',
            tooltip: 'Applicable line loss factor class',
            isReadOnly: false,
            formControlName: 'line_loss_factor_class_fk',
        };
        this.formFieldAttributes['llfc.effective_from'] = {
            label: 'Effective Date',
            placeholder: 'effective date of llfc',
            tooltip: 'Effective date of new Line Loss Factor class',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        this.formFieldAttributes['mc.measurement_class_fk'] = {
            label: 'Measurement Class',
            placeholder: 'Measurement class',
            tooltip: 'Applicable measurement class for the meter',
            isReadOnly: false,
            formControlName: 'measurement_class_fk',
        };
        this.formFieldAttributes['mc.effective_from'] = {
            label: 'Effective Date',
            placeholder: 'effective date of measurement class',
            tooltip: 'Effective date of new measurement class',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['asc.value'] = {
            label: 'Agreed Supply Capacity',
            placeholder: 'agreed supply capacity',
            tooltip: 'Agreed supply cpacity in KVA for MPAN',
            isReadOnly: false,
            formControlName: 'value',
        };
        this.formFieldAttributes['asc.effective_from'] = {
            label: 'Effective Date',
            placeholder: 'effective date of ASC',
            tooltip: 'Effective date of new agreed supply capacity',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['ssc.ssc_fk'] = {
            label: 'STD Settlement Code',
            placeholder: 'std settlement code',
            tooltip: 'Standard Settlement code applicabe to mpan',
            isReadOnly: false,
            formControlName: 'ssc_fk',
        };
        this.formFieldAttributes['ssc.effective_from'] = {
            label: 'Effective Date',
            placeholder: 'effective date of SSC',
            tooltip: 'Effective date of new settlement code',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['mpan.connection_date'] = {
            label: 'Connection Date',
            placeholder: 'mpan connection date',
            tooltip: 'MPAN connection date',
            isReadOnly: false,
            formControlName: 'connection_date',
        };
        this.formFieldAttributes['mpan.disconnection_date'] = {
            label: 'Disconnection Date',
            placeholder: 'mpan disconnection date',
            tooltip: 'MPAN disconnection date',
            isReadOnly: false,
            formControlName: 'disconnection_date',
        };
        //
        //
        this.formFieldAttributes['unmetered'] = {
            label: 'Un-metered',
            placeholder: '',
            tooltip: 'Check if MPAN is un-metered',
            isReadOnly: false,
            formControlName: 'unmetered',
        };
        this.formFieldAttributes['export'] = {
            label: 'Export MPAN',
            placeholder: '',
            tooltip: 'Check if MPAN needs to be exported',
            isReadOnly: false,
            formControlName: 'export',
        };
        //
        //
        this.formFieldAttributes['da_mpid.market_participant_fk'] = {
            label: 'Data Aggregator',
            placeholder: 'Data aggregator code',
            tooltip: 'DA assigned to mpan',
            isReadOnly: false,
            formControlName: 'market_participant_fk',
        };
        this.formFieldAttributes['da_mpid.role_fk'] = {
            label: 'Role',
            placeholder: 'role',
            tooltip: 'ROLE',
            isReadOnly: false,
            formControlName: 'role_fk',
        };
        this.formFieldAttributes['da_mpid.effective_from'] = {
            label: 'Effective From',
            placeholder: 'effective from date',
            tooltip: 'Effective from date',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['dc_mpid.market_participant_fk'] = {
            label: 'Data Collector',
            placeholder: 'Data collector code',
            tooltip: 'DC assigned to mpan',
            isReadOnly: false,
            formControlName: 'market_participant_fk',
        };
        this.formFieldAttributes['dc_mpid.role_fk'] = {
            label: 'Role',
            placeholder: 'role',
            tooltip: 'ROLE',
            isReadOnly: false,
            formControlName: 'role_fk',
        };
        this.formFieldAttributes['dc_mpid.effective_from'] = {
            label: 'Effective From',
            placeholder: 'effective from date',
            tooltip: 'Effective from date',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['mop_mpid.market_participant_fk'] = {
            label: 'Meter Point Operator',
            placeholder: 'Meter point operator',
            tooltip: 'Meter Point Operator',
            isReadOnly: false,
            formControlName: 'market_participant_fk',
        };
        this.formFieldAttributes['mop_mpid.role_fk'] = {
            label: 'Role',
            placeholder: 'role',
            tooltip: 'ROLE',
            isReadOnly: false,
            formControlName: 'role_fk',
        };
        this.formFieldAttributes['mop_mpid.effective_from'] = {
            label: 'Effective From',
            placeholder: 'effective from date',
            tooltip: 'Effective from date',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['supplier_mpid.market_participant_fk'] = {
            label: 'Supplier ID',
            placeholder: 'supplier..',
            tooltip: 'Supplier ID ',
            isReadOnly: false,
            formControlName: 'market_participant_fk',
        };
        this.formFieldAttributes['supplier_mpid.role_fk'] = {
            label: 'Role',
            placeholder: 'role',
            tooltip: 'ROLE',
            isReadOnly: false,
            formControlName: 'role_fk',
        };
        this.formFieldAttributes['supplier_mpid.effective_from'] = {
            label: 'Effective From',
            placeholder: 'effective from date',
            tooltip: 'Effective from date',
            isReadOnly: true,
            formControlName: 'effective_from',
        };
        //
        this.formFieldAttributes['mpan.ct_class'] = {
            label: 'CT Class',
            placeholder: 'ct class ',
            tooltip: 'CT CLass',
            isReadOnly: false,
            formControlName: 'ct_class',
        };
        this.formFieldAttributes['mpan.ct_rating'] = {
            label: 'CT Rating',
            placeholder: 'ct rating ',
            tooltip: 'CT Rating',
            isReadOnly: false,
            formControlName: 'ct_rating',
        };
        this.formFieldAttributes['mpan.ct_ratio'] = {
            label: 'CT Ratio',
            placeholder: 'ct ratio ',
            tooltip: 'CT ratio',
            isReadOnly: false,
            formControlName: 'ct_ratio',
        };
        //
        this.formFieldAttributes['mpan.vt_class'] = {
            label: 'VT Class',
            placeholder: 'vt class ',
            tooltip: 'VT CLass',
            isReadOnly: false,
            formControlName: 'vt_class',
        };
        this.formFieldAttributes['mpan.vt_rating'] = {
            label: 'VT Rating',
            placeholder: 'vt rating ',
            tooltip: 'VT Rating',
            isReadOnly: false,
            formControlName: 'vt_rating',
        };
        this.formFieldAttributes['mpan.vt_ratio'] = {
            label: 'VT Ratio',
            placeholder: 'vt ratio ',
            tooltip: 'VT ratio',
            isReadOnly: false,
            formControlName: 'vt_ratio',
        };
        //
        this.formFieldAttributes['mpan.umso_reference'] = {
            label: 'UMSO Reference #',
            placeholder: 'UMSO REF ',
            tooltip: 'UMSO Reference Number',
            isReadOnly: false,
            formControlName: 'umso_reference',
        };
        this.formFieldAttributes['mpan.unique_property_reference_number'] = {
            label: 'Unique Property Ref #',
            placeholder: 'ref number..',
            tooltip: 'Unique Property Reference Number',
            isReadOnly: false,
            formControlName: 'unique_property_reference_number',
        };
    }

    // loader service for MPAN details
    public loadMPANDetails(mpanDetailsResponse: IMpanDetailsResponse) {
        this.mpan_form.patchValue({
            ...mpanDetailsResponse
        })
    }

    getFieldAttributes() {
        return this.formFieldAttributes;
    }

}