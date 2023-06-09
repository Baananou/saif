import { useQuery, useQueryClient, QueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosClient from "../../axiosClient";
import Image from "next/image";
import sirenOnImage from "../../public/siren_on.png";
import sirenOffImage from "../../public/siren_off.png";

interface MelangeurAlertProps {
  child: string;
  alertKey: string;
}

interface MelangeurData {
  [key: string]: any;
}

const getMelangeurData = async (child: string, alertKey: string): Promise<MelangeurData> => {
  try {
    const response = await axiosClient.get(`/melangeur?${child}=${alertKey}`);

    return response.data;

  } catch (error: unknown) {
    const errorMessage = typeof error === "string" ? error : "Failed to fetch user data";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const MelangeurAlert: React.FC<MelangeurAlertProps> = ({ child, alertKey }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<MelangeurData>(
    ["melangeurData", child, alertKey],
    () => getMelangeurData(child, alertKey),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["melangeurData", child, alertKey]);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Something went wrong.</div>;
  }

  const melangeurData = data as MelangeurData; // Type assertion to MelangeurData
  console.log('=============aaaaaa==========');
  console.log(melangeurData);
  console.log('====================================');

  return (
    <div>
      <div className="h-10 flex flex-col items-center justify-center gap-2">
        <Image
          src={melangeurData.value ? sirenOnImage : sirenOffImage}
          alt="Siren"
          className="w-10 h-10"
        />
        <div className="font-bold uppercase">{[alertKey]}</div>
      </div>
    </div>
  );
};

export default MelangeurAlert;
