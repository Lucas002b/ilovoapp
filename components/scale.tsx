import { Scale } from "@/app/page";

export type ScaleProps = {
    scale: Scale;
};

export default function ScaleComponent({ scale }: ScaleProps) {
    return (
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Título</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{scale.title}</dd>
                </div>
            </dl>
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Descrição</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{scale.description}</dd>
                </div>
            </dl>
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Data de agendamento</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{
                        new Date(scale.date).toDateString()
                    }</dd>
                </div>
            </dl>
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Membros</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {scale.members.map(member => (
                                <li key={member.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">{member.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>
            </dl>
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Músicas</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {scale.songs.map(song => (
                                <li key={song.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">{song.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>
            </dl>
        </div>
    );
}
