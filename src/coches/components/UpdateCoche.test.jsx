import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateCoche from './UpdateCoche';
import ServiceCoches from '../services/ServiceCoches';

jest.mock('../services/ServiceCoches');
jest.mock('react-router-dom', () => ({
    NavLink: ({ children }) => <span>{children}</span>,
    Navigate: () => <p>Volviendo al listado</p>
}));

test('consulta por ID, rellena el formulario y guarda los datos editados', async () => {
    let coche = { idCoche: 7, marca: 'Seat', modelo: 'Ibiza', conductor: 'Mario', imagen: '' };
    let findCoche = jest.fn().mockResolvedValue(coche);
    let updateCoche = jest.fn().mockResolvedValue({});
    ServiceCoches.mockImplementation(() => ({ findCoche, updateCoche }));
    render(<UpdateCoche id="7"/>);
    expect(findCoche).toHaveBeenCalledWith('7');
    expect(await screen.findByLabelText('Marca')).toHaveValue('Seat');
    expect(screen.getByLabelText('ID del coche')).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Leon' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await waitFor(() => expect(updateCoche).toHaveBeenCalledWith({ ...coche, modelo: 'Leon' }));
    expect(await screen.findByText('Volviendo al listado')).toBeInTheDocument();
});

test('muestra el error de consulta sin abrir un formulario vacío', async () => {
    ServiceCoches.mockImplementation(() => ({ findCoche: jest.fn().mockRejectedValue(new Error('Error de red')) }));
    render(<UpdateCoche id="7"/>);
    expect(await screen.findByRole('alert')).toHaveTextContent('No se ha podido cargar el coche.');
    expect(screen.queryByRole('button', { name: 'Guardar cambios' })).not.toBeInTheDocument();
});
