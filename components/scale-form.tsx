'use client';
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { OptionsOrGroups } from "react-select";
import CreatableSelect from 'react-select/creatable';
import { ZodError } from "zod";
import * as zod from "zod";

export type OptionType = {
    value: string,
    label: string,
    __isNew__?: boolean,
};

export type Inputs = {
    title: string,
    date: string,
    members: OptionType[],
    songs: OptionType[],
    description: string,
};

type ScaleFormProps = {
    onSubmit: SubmitHandler<Inputs>;
}

export const ScaleForm = ({ onSubmit }: ScaleFormProps) => {
    const membersSelectId = "members-select";
    const membersOptions: OptionsOrGroups<OptionType, any> = [];
    const songsSelectId = "songs-select";
    const songsOptions: OptionsOrGroups<OptionType, any> = [];

    const { register, handleSubmit, control, formState: { errors, isLoading } } = useForm<Inputs>({
        defaultValues: {
            title: '',
            date: new Date(Date.now()).toISOString(),
            members: [],
            songs: [],
            description: '',
        },
        resolver: async (data) => {
            try {
                const schema = zod.object({
                    title: zod.string().min(3, { message: "Título deve ter no mínimo 3 caracteres." }).max(50, { message: "Título deve ter no máximo 50 caracteres." }),
                    date: zod.string().min(10, { message: "Data inválida." }).max(10, { message: "Data inválida." }),
                    members: zod.array(zod.object({ value: zod.string(), label: zod.string() })).min(1, { message: "Selecione pelo menos um membro." }),
                    songs: zod.array(zod.object({ value: zod.string(), label: zod.string() })).min(1, { message: "Selecione pelo menos uma música." }),
                    description: zod.string().max(255, { message: "Descrição deve ter no máximo 255 caracteres." }),
                });
                await schema.parseAsync(data);
                return { values: data, errors: {} };
            } catch (error: unknown) {
                if (error instanceof ZodError)
                    return { values: {}, errors: error.formErrors.fieldErrors };
                throw error;
            }
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Escala</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Integre os participantes e músicas a sua escala.
            </p>

            <div className="flex gap-2 justify-between">
                <div className="col-span-full w-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Título</label>
                    <input {...register('title')} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Título" />
                    <p className="block text-sm text-red-500 py-1.5">{errors.title?.message}</p>
                </div>

                <div className="col-span-full w-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Data</label>
                    <input {...register('date')} type="date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <p className="block text-sm text-red-500 py-1.5">{errors.date?.message}</p>
                </div>
            </div>

            <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Descrição</label>
                <textarea {...register('description')} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Anotação"></textarea>
                <p className="block text-sm text-red-500 py-1.5">{errors.description?.message}</p>
            </div>

            <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Membros</label>
                <Controller
                    name="members"
                    control={control}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            instanceId={membersSelectId}
                            isMulti
                            isClearable
                            options={membersOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    )}
                />
                <p className="block text-sm text-red-500 py-1.5">{errors.members?.message}</p>
            </div>

            <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Músicas</label>
                <Controller
                    name="songs"
                    control={control}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            instanceId={songsSelectId}
                            isMulti
                            isClearable
                            options={songsOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    )}
                />
                <p className="block text-sm text-red-500 py-1.5">{errors.songs?.message}</p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                </button>
                <button type="submit" disabled={isLoading} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};
