import { describe, beforeAll, afterAll, it, expect } from '@jest/globals'
import * as request from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { LoginModule } from '../../src/login/login.module'
import { CommonService } from '../../src/common/common.service'
import { UserDTOMock, UserEmailDuplicateDTOMock, UserEmailErrorDTOMock } from '../../test/mocks/users.mock'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfig } from '../../src/config/jwt/jwt.config'

describe('Users E2E', () => {
  let app: INestApplication
  let accessToken: string

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/ticketlab_e2e'),
        JwtModule.register(JwtConfig),
        LoginModule
      ],
      providers: [CommonService],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await app.close()
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app.getHttpServer()).post('/users').send(UserDTOMock).expect(201)

      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('message', 'User created successfully')
      expect(response.body).toHaveProperty('data')
    })

    it('should return error if email error', async () => {
      await request(app.getHttpServer()).post('/users').send(UserEmailErrorDTOMock).expect(400);
    })

    it('should return error if email duplicate', async () => {
      await request(app.getHttpServer()).post('/users').send(UserEmailDuplicateDTOMock).expect(400);
    })
  })
})