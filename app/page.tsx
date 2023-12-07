'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/access-denied';
import { Scale as PrismaScale, Member, Song } from "@prisma/client";
import ScaleComponent from '@/components/scale';
import Spinner from '@/components/ui/spinner';

export interface Scale extends PrismaScale {
  members: Member[];
  songs: Song[];
}

export type Props = {
  scales: Scale[]
}

export default function Index() {
  const { data: session } = useSession();
  const [scales, setScales] = useState<Scale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScales = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/scales');
      const data = await response.json();
      setScales(data);
    } catch (error) {
      setError("Alguma coisa deu errado!");
    }
    setLoading(false);
  };

  useEffect(() => { fetchScales() }, [session]);

  return (
    <div className="space-y-2">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Escalas disponíveis</h3>
        {!!error && <p className="mt-1 max-w-2xl text-sm leading-6 text-red-500">{error}</p>}
      </div>
      <div>
        {!!loading && <div className="flex justify-center"><Spinner /></div>}
        {!!scales && scales.map((scale) => <React.Fragment key={scale.id}>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <ScaleComponent scale={scale} />
        </React.Fragment>)}
      </div>
    </div>
  );
}
