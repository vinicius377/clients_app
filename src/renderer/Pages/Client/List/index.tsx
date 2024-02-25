import { useEffect, useState } from 'react'
import { clientEvents } from '../../../Events/clients';
import { Client } from '../../../../shared/types/Client';

export function List() {
    const [clients, setClients] = useState<Client[]>([])
    
    const getClients = async () => {
        try {
            const clients = await clientEvents.list();
            setClients(clients.result)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    return <table>
        <ul>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client => (
                    <tr>
                        <td>{client.name}</td>
                        <td>{client.cpf}</td>
                    </tr>
                ))}
            </tbody>
        </ul>
    </table>
}