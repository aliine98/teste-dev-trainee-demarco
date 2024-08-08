export function addClient(name, email, date) {
    // clientsList.push({ id: crypto.randomUUID(), name, email, date });
    localStorage.setItem('clients', JSON.stringify([...getClients(), { id: crypto.randomUUID(), name, email, date }]));
}

export function getClients() {
    return JSON.parse(localStorage.getItem('clients')) || [];
}

export function deleteClient(id) {
    // const index = clientsList.findIndex(client => client.id === id);
    // clientsList.splice(index, 1);
    const clients = JSON.parse(localStorage.getItem('clients'));
    const index = clients.findIndex(client => client.id === id);
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
}

export function editClient(id, newClient) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const client = clients.find(client => client.id === id);
    client.name = newClient.name;
    client.email = newClient.email;
    client.date = newClient.date;
    localStorage.setItem('clients', JSON.stringify(clients));
}
