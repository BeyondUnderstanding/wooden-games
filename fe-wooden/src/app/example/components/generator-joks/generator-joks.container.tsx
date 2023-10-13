'use client';
import React from 'react';
import { newGeneratorJoksViewModel } from './generator-joks.view-model';
import { JoksComponent } from './generator-joks.component';
import { restService } from '../../service/rest-service';
import { newDefaultScheduler } from '@most/scheduler';
import { useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const JoksContainer = () => {
    const service = restService();
    const vm = useValueWithEffect(newDefaultScheduler())(
        () => newGeneratorJoksViewModel(service),
        []
    );

    return React.createElement(JoksComponent, {
        setTriger: vm.triger,
        jokes: useProperty(vm.jokes),
    });
};
