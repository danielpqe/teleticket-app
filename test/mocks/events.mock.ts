import { CreateEventDto } from 'src/events/dto/create-event.dto';

export const EventCodeMock = 'EVN-999999';
export const EventsMock = {
  id: '3503d0e7-2c79-4b94-9930-696f1523563c',
  name: 'Festi Rock 2025',
  description: 'Best rock festival of the year',
  location: 'Lima',
  ticket_price: 100,
  event_type: 'concierto',
  event_category: 'importante',
  event_code: 'EVN-999999',
  event_status: 'created',
  status: true,
  created_at: '2025-09-12T06:59:56.746Z',
  updated_at: '2025-09-12T06:59:56.746Z',
  created_user: 'danielpqe@gmail.com',
  updated_user: null,
};

export const EventDTOMock: CreateEventDto = {
  name: 'Festi Rock 2025',
  description: 'Best rock festival of the year',
  location: 'Lima',
  ticket_price: 100,
  event_type: 'concierto',
  category: 'importante',
};
