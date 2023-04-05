import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Cart = {
  __typename?: 'Cart';
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  items: Array<CartItem>;
  totalPrice: Scalars['Float'];
  updatedAt?: Maybe<Scalars['Date']>;
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  price: Scalars['Float'];
  product?: Maybe<Product>;
  quantity: Scalars['Int'];
  size?: Maybe<Scalars['String']>;
  toppings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CartItemInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
  toppings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CartItemUpdateInput = {
  cartItemIndex: Scalars['Int'];
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
  toppings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type CategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart?: Maybe<Cart>;
  cancelOrder?: Maybe<Order>;
  clearCart?: Maybe<Cart>;
  createCategory: Category;
  createProduct: Product;
  deleteCategory: Category;
  deleteProduct?: Maybe<Product>;
  deleteUser: Success;
  editUser: User;
  login: Login;
  placeOrder?: Maybe<Order>;
  removeFromCart?: Maybe<Cart>;
  signup: Login;
  updateCartItem?: Maybe<Cart>;
  updateCategory: Category;
  updateOrderStatus?: Maybe<Order>;
  updateProduct: Product;
};

export type MutationAddToCartArgs = {
  items: Array<CartItemInput>;
};

export type MutationCancelOrderArgs = {
  id: Scalars['ID'];
};

export type MutationCreateCategoryArgs = {
  category: CategoryInput;
};

export type MutationCreateProductArgs = {
  product: ProductInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationEditUserArgs = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationPlaceOrderArgs = {
  products: Array<ProductOrderInput>;
};

export type MutationRemoveFromCartArgs = {
  cartItemIndex: Scalars['Int'];
};

export type MutationSignupArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};

export type MutationUpdateCartItemArgs = {
  itemsUpdate: Array<CartItemUpdateInput>;
};

export type MutationUpdateCategoryArgs = {
  category: CategoryInput;
  id: Scalars['ID'];
};

export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID'];
  status: OrderStatus;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  product: ProductInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  products: Array<ProductOrder>;
  status: OrderStatus;
  total: Scalars['Float'];
  user: User;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
}

export type Product = {
  __typename?: 'Product';
  category: Category;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  details?: Maybe<ProductDetail>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['Date'];
};

export type ProductDetail = {
  __typename?: 'ProductDetail';
  size?: Maybe<Array<Maybe<Size>>>;
  topping?: Maybe<Array<Maybe<Topping>>>;
};

export type ProductDetailInput = {
  size?: InputMaybe<Array<InputMaybe<SizeInput>>>;
  topping?: InputMaybe<Array<InputMaybe<ToppingInput>>>;
};

export type ProductInput = {
  category: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<ProductDetailInput>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductOrder = {
  __typename?: 'ProductOrder';
  product: Product;
  quantity: Scalars['Int'];
};

export type ProductOrderInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<Cart>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getProduct?: Maybe<Product>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  getUser: User;
  getUsers?: Maybe<Array<User>>;
  order?: Maybe<Order>;
  orders: Array<Order>;
};

export type QueryGetCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryGetProductArgs = {
  id: Scalars['ID'];
};

export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type QueryOrderArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Size = {
  __typename?: 'Size';
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type SizeInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Topping = {
  __typename?: 'Topping';
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ToppingInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
};

export type AddToCartMutationVariables = Exact<{
  items: Array<CartItemInput> | CartItemInput;
}>;

export type AddToCartMutation = {
  __typename?: 'Mutation';
  addToCart?: {
    __typename?: 'Cart';
    id: string;
    totalPrice: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      phoneNumber: string;
      address?: string | null;
    };
    items: Array<{
      __typename?: 'CartItem';
      quantity: number;
      size?: string | null;
      toppings?: Array<string | null> | null;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        image?: string | null;
      } | null;
    }>;
  } | null;
};

export type ClearCartMutationVariables = Exact<{ [key: string]: never }>;

export type ClearCartMutation = {
  __typename?: 'Mutation';
  clearCart?: {
    __typename?: 'Cart';
    id: string;
    totalPrice: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      phoneNumber: string;
      address?: string | null;
    };
    items: Array<{
      __typename?: 'CartItem';
      quantity: number;
      size?: string | null;
      toppings?: Array<string | null> | null;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        image?: string | null;
      } | null;
    }>;
  } | null;
};

export type CreateCategoryMutationVariables = Exact<{
  category: CategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreateProductMutationVariables = Exact<{
  product: ProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    category: { __typename?: 'Category'; id: string; name: string; image?: string | null };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
      topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
    } | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory: {
    __typename?: 'Category';
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct?: {
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    category: { __typename?: 'Category'; id: string; name: string; image?: string | null };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
      topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
    } | null;
  } | null;
};

export type EditUserMutationVariables = Exact<{
  id: Scalars['ID'];
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  editUser: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    phoneNumber: string;
    address?: string | null;
    email: string;
  };
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'Login'; message: string; token?: string | null };
};

export type RemoveFromCartMutationVariables = Exact<{
  cartItemIndex: Scalars['Int'];
}>;

export type RemoveFromCartMutation = {
  __typename?: 'Mutation';
  removeFromCart?: {
    __typename?: 'Cart';
    id: string;
    totalPrice: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      phoneNumber: string;
      address?: string | null;
    };
    items: Array<{
      __typename?: 'CartItem';
      quantity: number;
      size?: string | null;
      toppings?: Array<string | null> | null;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        image?: string | null;
      } | null;
    }>;
  } | null;
};

export type SignupMutationVariables = Exact<{
  registerInput?: InputMaybe<RegisterInput>;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: { __typename?: 'Login'; message: string; token?: string | null };
};

export type UpdateCartItemMutationVariables = Exact<{
  itemsUpdate: Array<CartItemUpdateInput> | CartItemUpdateInput;
}>;

export type UpdateCartItemMutation = {
  __typename?: 'Mutation';
  updateCartItem?: {
    __typename?: 'Cart';
    id: string;
    totalPrice: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      phoneNumber: string;
      address?: string | null;
    };
    items: Array<{
      __typename?: 'CartItem';
      quantity: number;
      size?: string | null;
      toppings?: Array<string | null> | null;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        image?: string | null;
      } | null;
    }>;
  } | null;
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  category: CategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename?: 'Category';
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID'];
  product: ProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    category: { __typename?: 'Category'; id: string; name: string; image?: string | null };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
      topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
    } | null;
  };
};

export type GetCartQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartQuery = {
  __typename?: 'Query';
  getCart?: {
    __typename?: 'Cart';
    id: string;
    totalPrice: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    user: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      phoneNumber: string;
      address?: string | null;
      email: string;
    };
    items: Array<{
      __typename?: 'CartItem';
      quantity: number;
      size?: string | null;
      toppings?: Array<string | null> | null;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        image?: string | null;
        description?: string | null;
        createdAt: any;
        updatedAt: any;
        category: {
          __typename?: 'Category';
          id: string;
          name: string;
          image?: string | null;
          description?: string | null;
          createdAt: any;
          updatedAt: any;
        };
        details?: {
          __typename?: 'ProductDetail';
          size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
          topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  getCategories: Array<{
    __typename?: 'Category';
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
  }>;
};

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetCategoryQuery = {
  __typename?: 'Query';
  getCategory?: {
    __typename?: 'Category';
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
  } | null;
};

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  getProduct?: {
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    category: {
      __typename?: 'Category';
      id: string;
      name: string;
      image?: string | null;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
    };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
      topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
    } | null;
  } | null;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = {
  __typename?: 'Query';
  getProducts?: Array<{
    __typename?: 'Product';
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    category: {
      __typename?: 'Category';
      id: string;
      name: string;
      image?: string | null;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
    };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{ __typename?: 'Size'; name: string; price: number } | null> | null;
      topping?: Array<{ __typename?: 'Topping'; name: string; price: number } | null> | null;
    } | null;
  } | null> | null;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  getUser: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    phoneNumber: string;
    address?: string | null;
    email: string;
  };
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  getUsers?: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    phoneNumber: string;
    address?: string | null;
    email: string;
  }> | null;
};

export const AddToCartDocument = gql`
  mutation addToCart($items: [CartItemInput!]!) {
    addToCart(items: $items) {
      id
      user {
        id
        name
        phoneNumber
        address
      }
      items {
        product {
          id
          name
          price
          image
        }
        quantity
        size
        toppings
        price
      }
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
export type AddToCartMutationFn = Apollo.MutationFunction<
  AddToCartMutation,
  AddToCartMutationVariables
>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      items: // value for 'items'
 *   },
 * });
 */
export function useAddToCartMutation(
  baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(
    AddToCartDocument,
    options,
  );
}
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<
  AddToCartMutation,
  AddToCartMutationVariables
>;
export const ClearCartDocument = gql`
  mutation clearCart {
    clearCart {
      id
      user {
        id
        name
        phoneNumber
        address
      }
      items {
        product {
          id
          name
          price
          image
        }
        quantity
        size
        toppings
        price
      }
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
export type ClearCartMutationFn = Apollo.MutationFunction<
  ClearCartMutation,
  ClearCartMutationVariables
>;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(
  baseOptions?: Apollo.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ClearCartMutation, ClearCartMutationVariables>(
    ClearCartDocument,
    options,
  );
}
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export type ClearCartMutationResult = Apollo.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = Apollo.BaseMutationOptions<
  ClearCartMutation,
  ClearCartMutationVariables
>;
export const CreateCategoryDocument = gql`
  mutation createCategory($category: CategoryInput!) {
    createCategory(category: $category) {
      id
      name
      image
      description
      createdAt
      updatedAt
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CreateCategoryDocument,
    options,
  );
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const CreateProductDocument = gql`
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
      price
      image
      category {
        id
        name
        image
      }
      description
      details {
        size {
          name
          price
        }
        topping {
          name
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      product: // value for 'product'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(
    CreateProductDocument,
    options,
  );
}
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      image
      description
      createdAt
      updatedAt
    }
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    options,
  );
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      price
      image
      category {
        id
        name
        image
      }
      description
      details {
        size {
          name
          price
        }
        topping {
          name
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(
    DeleteProductDocument,
    options,
  );
}
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const EditUserDocument = gql`
  mutation editUser(
    $id: ID!
    $email: String
    $phoneNumber: String
    $password: String
    $name: String
    $address: String
  ) {
    editUser(
      id: $id
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      name: $name
      address: $address
    ) {
      id
      name
      phoneNumber
      address
      email
    }
  }
`;
export type EditUserMutationFn = Apollo.MutationFunction<
  EditUserMutation,
  EditUserMutationVariables
>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useEditUserMutation(
  baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>;
export const LoginDocument = gql`
  mutation login($email: String, $phoneNumber: String, $password: String!) {
    login(email: $email, phoneNumber: $phoneNumber, password: $password) {
      message
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RemoveFromCartDocument = gql`
  mutation removeFromCart($cartItemIndex: Int!) {
    removeFromCart(cartItemIndex: $cartItemIndex) {
      id
      user {
        id
        name
        phoneNumber
        address
      }
      items {
        product {
          id
          name
          price
          image
        }
        quantity
        size
        toppings
        price
      }
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      cartItemIndex: // value for 'cartItemIndex'
 *   },
 * });
 */
export function useRemoveFromCartMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(
    RemoveFromCartDocument,
    options,
  );
}
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($registerInput: RegisterInput) {
    signup(registerInput: $registerInput) {
      message
      token
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const UpdateCartItemDocument = gql`
  mutation updateCartItem($itemsUpdate: [CartItemUpdateInput!]!) {
    updateCartItem(itemsUpdate: $itemsUpdate) {
      id
      user {
        id
        name
        phoneNumber
        address
      }
      items {
        product {
          id
          name
          price
          image
        }
        quantity
        size
        toppings
        price
      }
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      itemsUpdate: // value for 'itemsUpdate'
 *   },
 * });
 */
export function useUpdateCartItemMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(
    UpdateCartItemDocument,
    options,
  );
}
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation updateCategory($id: ID!, $category: CategoryInput!) {
    updateCategory(id: $id, category: $category) {
      id
      name
      image
      description
      createdAt
      updatedAt
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    UpdateCategoryDocument,
    options,
  );
}
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation updateProduct($id: ID!, $product: ProductInput!) {
    updateProduct(id: $id, product: $product) {
      id
      name
      price
      image
      category {
        id
        name
        image
      }
      description
      details {
        size {
          name
          price
        }
        topping {
          name
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      product: // value for 'product'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(
    UpdateProductDocument,
    options,
  );
}
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const GetCartDocument = gql`
  query getCart {
    getCart {
      id
      user {
        id
        name
        phoneNumber
        address
        email
      }
      items {
        product {
          id
          name
          price
          image
          category {
            id
            name
            image
            description
            createdAt
            updatedAt
          }
          description
          details {
            size {
              name
              price
            }
            topping {
              name
              price
            }
          }
          createdAt
          updatedAt
        }
        quantity
        size
        toppings
        price
      }
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetCartQuery__
 *
 * To run a query within a React component, call `useGetCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCartQuery, GetCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
}
export function useGetCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
}
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = Apollo.QueryResult<GetCartQuery, GetCartQueryVariables>;
export function refetchGetCartQuery(variables?: GetCartQueryVariables) {
  return { query: GetCartDocument, variables: variables };
}
export const GetCategoriesDocument = gql`
  query getCategories {
    getCategories {
      id
      name
      image
      description
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export function refetchGetCategoriesQuery(variables?: GetCategoriesQueryVariables) {
  return { query: GetCategoriesDocument, variables: variables };
}
export const GetCategoryDocument = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      description
    }
  }
`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
}
export function useGetCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(
    GetCategoryDocument,
    options,
  );
}
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<
  GetCategoryQuery,
  GetCategoryQueryVariables
>;
export function refetchGetCategoryQuery(variables: GetCategoryQueryVariables) {
  return { query: GetCategoryDocument, variables: variables };
}
export const GetProductDocument = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      image
      category {
        id
        name
        image
        description
        createdAt
        updatedAt
      }
      description
      details {
        size {
          name
          price
        }
        topping {
          name
          price
        }
      }
    }
  }
`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(
  baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
}
export function useGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    options,
  );
}
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export function refetchGetProductQuery(variables: GetProductQueryVariables) {
  return { query: GetProductDocument, variables: variables };
}
export const GetProductsDocument = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      image
      category {
        id
        name
        image
        description
        createdAt
        updatedAt
      }
      description
      details {
        size {
          name
          price
        }
        topping {
          name
          price
        }
      }
    }
  }
`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
}
export function useGetProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options,
  );
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export function refetchGetProductsQuery(variables?: GetProductsQueryVariables) {
  return { query: GetProductsDocument, variables: variables };
}
export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phoneNumber
      address
      email
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export function refetchGetUserQuery(variables: GetUserQueryVariables) {
  return { query: GetUserDocument, variables: variables };
}
export const GetUsersDocument = gql`
  query GetUsers {
    getUsers {
      id
      name
      phoneNumber
      address
      email
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
  return { query: GetUsersDocument, variables: variables };
}
