import React from 'react';
type IPropsGraphqlProvider = {
  children?: React.ReactNode | React.ReactNode[];
};
export declare class GraphqlProvider extends React.Component<
  IPropsGraphqlProvider,
  {
    token: string;
  }
> {
  constructor(props: IPropsGraphqlProvider);
  componentDidMount(): void;
  render(): JSX.Element;
}
export {};
