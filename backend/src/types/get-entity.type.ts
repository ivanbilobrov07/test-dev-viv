import {
  FindOptionsSelect,
  FindOptionsWhere,
  FindOptionsRelations,
} from 'typeorm';

export type GetEntity<T> = {
  select?: FindOptionsSelect<T>;
  where?: FindOptionsWhere<T>;
  relations?: FindOptionsRelations<T>;
};
