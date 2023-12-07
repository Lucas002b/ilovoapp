"use client";
import { Inputs, ScaleForm } from "@/components/scale-form";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type Data = {
  title: string,
  date: Date,
  members: string[],
  songs: string[],
  description: string,
};

export default function Index() {
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    const membersStringArray: string[] = data.members.map((member) => member.label);
    const songsStringArray: string[] = data.songs.map((song) => song.label);

    const postData: Data = {
      title: data.title,
      date: new Date(data.date),
      members: membersStringArray,
      songs: songsStringArray,
      description: data.description,
    };

    const result = await fetch('/api/scales', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await result.json();
    if (response.error) {
      setError(response.error);
      return;
    }

    push('/');
  };

  return (
    <div className="space-y-2">
      <div className="px-4 sm:px-0">
        {!!error && <p className="mt-1 max-w-2xl text-sm leading-6 text-red-500">{error}</p>}
        <ScaleForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
