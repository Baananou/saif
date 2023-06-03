import Image from 'next/image';
import sirenOnImage from '../public/siren_on.png';
import sirenOffImage from '../public/siren_off.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface AlertProps {
  deviceLabel: string;
  variableLabel: string;
  variableId: string;
  name: string;
  apiToken: any;
}

const Alert: React.FC<AlertProps> = ({ deviceLabel, variableLabel, variableId, name, apiToken }) => {
  const [value, setValue] = useState<number | null>(null);
  const [sirenActive, setSirenActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const response = await axios.get(`https://industrial.api.ubidots.com/api/v1.6/devices/${deviceLabel}/${variableLabel}/lv`, {
          headers: {
            'X-Auth-Token': apiToken,
            'Content-Type': 'application/json',
          },
        });

        const fetchedValue = response.data;
        setValue(fetchedValue);
        console.log(response.data);

        // Test the value and set the constant
        setSirenActive(fetchedValue === 1);

      } catch (error) {
        console.error('Error fetching variable value:', error);
      }
    };

    fetchValue();
  }, [variableLabel, apiToken]);

  return (
    <div>
      <div className="h-10 flex flex-col items-center justify-center gap-2">
        <Image
          src={sirenActive ? sirenOnImage : sirenOffImage}
          alt="Siren"
          className="w-10 h-10"
        />
        <div className='font-bold uppercase'>{name}</div>
      </div>
    </div>
  );
};

export default Alert;
