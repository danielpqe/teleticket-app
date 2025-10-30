export const UsersMock = {
  name: 'miguel',
  last_name: 'diaz',
  email: 'miguel@gmail.com',
  code: 'USR-9999',
  status: true,
  created_at: '2025-10-21T02:24:39.654Z',
};

export const UsersCodeMock = 'USR-9999';
export const UsersJWTMock = 'jwt-token';

export const UserModelMock = {
  ...UsersMock,
  updated_at: new Date(),
  save: jest.fn(),
  _id: 'mock_id',
};
