import React from 'react';
type IPropsGraphqlProvider = {
  children?: React.ReactNode | React.ReactNode[];
  token?: string;
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
declare const _default: (props: any) => JSX.Element;
export default _default;
