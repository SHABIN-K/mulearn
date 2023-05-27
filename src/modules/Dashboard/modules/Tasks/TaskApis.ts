import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";
import { parse } from "path";
import { useState } from "react";

export const getTasks = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(dashboardRoutes.getTasksData, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        });
        const tasks: any = response?.data;
        setData(tasks.response.data);
        setTotalPages(tasks.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getTaskDetails = async (
    id: string | undefined,
    setInput: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getTasksData + "get/" + id + "/"
        );
        const message: any = response?.data;
        console.log(message);
        console.log(message.response.interestGroup.name);
        setInput(message.response.interestGroup.name);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editTask = async (
	hashtag: string,
	title: string,
    karma: string,
    usage_count: string,
    active: string,
    variable_karma: string,
    id: string | undefined
	
) => {
	try {
		const response = await privateGateway.put(
			dashboardRoutes.getTasksData + "edit/" + id + "/",
			{
				title: title,
				hashtag: hashtag,
				karma: parseInt(karma),
				usage_count: parseInt(usage_count),
				active: parseInt(active),
				variable_karma: parseInt(variable_karma)
			}
		);
		const message: any = response?.data;
		console.log(message);
	} catch (err: unknown) {
		const error = err as AxiosError;
		if (error?.response) {
			console.log(error.response);
		}
	}
};