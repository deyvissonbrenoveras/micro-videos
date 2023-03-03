export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export default class Category {
  constructor(public readonly props: CategoryProperties) {}
  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }
  get is_active(): boolean | undefined {
    return this.props.is_active;
  }
  get created_at(): Date | undefined {
    return this.props.created_at;
  }
}
