import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Graphql {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
