import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export interface UbidotsData {
	timestamp: number;
	value: number;
}

interface UbidotsResponse {
	results: UbidotsData[];
}

// Modify these variables with your Ubidots credentials
const API_KEY = process.env.UBIDOTS_API_TOKEN;
// const DEVICE_LABEL = process.env.UBIDOTS_DEVICE_LABEL;
const DEVICE_LABEL = "pfe";

export function useDeviceVariableData(variableLabel: string) {
	const [variableData, setVariableData] = useState<UbidotsData[]>([]);

	useEffect(() => {
		async function fetchVariableData() {
			try {
				const response: AxiosResponse<UbidotsResponse> = await axios.get(
					`https://industrial.api.ubidots.com/api/v1.6/devices/${DEVICE_LABEL}/${variableLabel}/values`,
					{
						headers: { "X-Auth-Token": API_KEY },
					}
				);

				setVariableData(response.data.results);
			} catch (error) {
				console.error("Error fetching device variable data:", error);
			}
		}

		fetchVariableData();
	}, [variableLabel]);

	return variableData;
}

export function usePostDeviceVariableValue() {
	const postDeviceVariableValue = async (
		variableLabel: string,
		value: number
	): Promise<void> => {
		try {
			const response = await axios.post(
				`https://industrial.api.ubidots.com/api/v1.6/devices/${DEVICE_LABEL}/${variableLabel}/values`,
				{
					value: value,
				},
				{
					headers: {
						"X-Auth-Token": API_KEY,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Post response:", response);
		} catch (error) {
			console.error("Error posting device variable value:", error);
		}
	};

	return postDeviceVariableValue;
}