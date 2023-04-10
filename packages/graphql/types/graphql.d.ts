import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<
  T extends {
    [key: string]: unknown;
  },
> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  idCart: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
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
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  items: Array<OrderItem>;
  note: Scalars['String'];
  status: OrderStatus;
  totalPrice: Scalars['Float'];
  updatedAt?: Maybe<Scalars['Date']>;
  user: User;
};
export type OrderItem = {
  __typename?: 'OrderItem';
  price: Scalars['Float'];
  product?: Maybe<Product>;
  quantity: Scalars['Int'];
  size: Scalars['String'];
  toppings?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare enum OrderStatus {
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
export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<Cart>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getOrder?: Maybe<Order>;
  getOrders: Array<Order>;
  getProduct?: Maybe<Product>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  getUser: User;
  getUsers?: Maybe<Array<User>>;
};
export type QueryGetCategoryArgs = {
  id: Scalars['ID'];
};
export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};
export type QueryGetProductArgs = {
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
export type CancelOrderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;
export type CancelOrderMutation = {
  __typename?: 'Mutation';
  cancelOrder?: {
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    status: OrderStatus;
    note: string;
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
      __typename?: 'OrderItem';
      quantity: number;
      size: string;
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
          size?: Array<{
            __typename?: 'Size';
            name: string;
            price: number;
          } | null> | null;
          topping?: Array<{
            __typename?: 'Topping';
            name: string;
            price: number;
          } | null> | null;
        } | null;
      } | null;
    }>;
  } | null;
};
export type ClearCartMutationVariables = Exact<{
  [key: string]: never;
}>;
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
    category: {
      __typename?: 'Category';
      id: string;
      name: string;
      image?: string | null;
    };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{
        __typename?: 'Size';
        name: string;
        price: number;
      } | null> | null;
      topping?: Array<{
        __typename?: 'Topping';
        name: string;
        price: number;
      } | null> | null;
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
    category: {
      __typename?: 'Category';
      id: string;
      name: string;
      image?: string | null;
    };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{
        __typename?: 'Size';
        name: string;
        price: number;
      } | null> | null;
      topping?: Array<{
        __typename?: 'Topping';
        name: string;
        price: number;
      } | null> | null;
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
  login: {
    __typename?: 'Login';
    message: string;
    token?: string | null;
  };
};
export type PlaceOrderMutationVariables = Exact<{
  idCart: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
}>;
export type PlaceOrderMutation = {
  __typename?: 'Mutation';
  placeOrder?: {
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    status: OrderStatus;
    note: string;
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
      __typename?: 'OrderItem';
      quantity: number;
      size: string;
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
          size?: Array<{
            __typename?: 'Size';
            name: string;
            price: number;
          } | null> | null;
          topping?: Array<{
            __typename?: 'Topping';
            name: string;
            price: number;
          } | null> | null;
        } | null;
      } | null;
    }>;
  } | null;
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
  signup: {
    __typename?: 'Login';
    message: string;
    token?: string | null;
  };
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
    category: {
      __typename?: 'Category';
      id: string;
      name: string;
      image?: string | null;
    };
    details?: {
      __typename?: 'ProductDetail';
      size?: Array<{
        __typename?: 'Size';
        name: string;
        price: number;
      } | null> | null;
      topping?: Array<{
        __typename?: 'Topping';
        name: string;
        price: number;
      } | null> | null;
    } | null;
  };
};
export type GetCartQueryVariables = Exact<{
  [key: string]: never;
}>;
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
          size?: Array<{
            __typename?: 'Size';
            name: string;
            price: number;
          } | null> | null;
          topping?: Array<{
            __typename?: 'Topping';
            name: string;
            price: number;
          } | null> | null;
        } | null;
      } | null;
    }>;
  } | null;
};
export type GetCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;
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
export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;
export type GetOrderQuery = {
  __typename?: 'Query';
  getOrder?: {
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    status: OrderStatus;
    note: string;
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
      __typename?: 'OrderItem';
      quantity: number;
      size: string;
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
          size?: Array<{
            __typename?: 'Size';
            name: string;
            price: number;
          } | null> | null;
          topping?: Array<{
            __typename?: 'Topping';
            name: string;
            price: number;
          } | null> | null;
        } | null;
      } | null;
    }>;
  } | null;
};
export type GetOrdersQueryVariables = Exact<{
  [key: string]: never;
}>;
export type GetOrdersQuery = {
  __typename?: 'Query';
  getOrders: Array<{
    __typename?: 'Order';
    id: string;
    totalPrice: number;
    status: OrderStatus;
    note: string;
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
      __typename?: 'OrderItem';
      quantity: number;
      size: string;
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
          size?: Array<{
            __typename?: 'Size';
            name: string;
            price: number;
          } | null> | null;
          topping?: Array<{
            __typename?: 'Topping';
            name: string;
            price: number;
          } | null> | null;
        } | null;
      } | null;
    }>;
  }>;
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
      size?: Array<{
        __typename?: 'Size';
        name: string;
        price: number;
      } | null> | null;
      topping?: Array<{
        __typename?: 'Topping';
        name: string;
        price: number;
      } | null> | null;
    } | null;
  } | null;
};
export type GetProductsQueryVariables = Exact<{
  [key: string]: never;
}>;
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
      size?: Array<{
        __typename?: 'Size';
        name: string;
        price: number;
      } | null> | null;
      topping?: Array<{
        __typename?: 'Topping';
        name: string;
        price: number;
      } | null> | null;
    } | null;
  } | null> | null;
};
export type GetUserQueryVariables = Exact<{
  [key: string]: never;
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
export type GetUsersQueryVariables = Exact<{
  [key: string]: never;
}>;
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
export declare const AddToCartDocument: Apollo.DocumentNode;
export type AddToCartMutationFn = Apollo.MutationFunction<
  AddToCartMutation,
  AddToCartMutationVariables
>;
export declare function useAddToCartMutation(
  baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>,
): Apollo.MutationTuple<
  AddToCartMutation,
  Exact<{
    items: CartItemInput | CartItemInput[];
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<
  AddToCartMutation,
  AddToCartMutationVariables
>;
export declare const CancelOrderDocument: Apollo.DocumentNode;
export type CancelOrderMutationFn = Apollo.MutationFunction<
  CancelOrderMutation,
  CancelOrderMutationVariables
>;
export declare function useCancelOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>,
): Apollo.MutationTuple<
  CancelOrderMutation,
  Exact<{
    id: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<
  CancelOrderMutation,
  CancelOrderMutationVariables
>;
export declare const ClearCartDocument: Apollo.DocumentNode;
export type ClearCartMutationFn = Apollo.MutationFunction<
  ClearCartMutation,
  ClearCartMutationVariables
>;
export declare function useClearCartMutation(
  baseOptions?: Apollo.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>,
): Apollo.MutationTuple<
  ClearCartMutation,
  Exact<{
    [key: string]: never;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export type ClearCartMutationResult = Apollo.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = Apollo.BaseMutationOptions<
  ClearCartMutation,
  ClearCartMutationVariables
>;
export declare const CreateCategoryDocument: Apollo.DocumentNode;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export declare function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>,
): Apollo.MutationTuple<
  CreateCategoryMutation,
  Exact<{
    category: CategoryInput;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export declare const CreateProductDocument: Apollo.DocumentNode;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export declare function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>,
): Apollo.MutationTuple<
  CreateProductMutation,
  Exact<{
    product: ProductInput;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export declare const DeleteCategoryDocument: Apollo.DocumentNode;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export declare function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>,
): Apollo.MutationTuple<
  DeleteCategoryMutation,
  Exact<{
    id: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export declare const DeleteProductDocument: Apollo.DocumentNode;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export declare function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>,
): Apollo.MutationTuple<
  DeleteProductMutation,
  Exact<{
    id: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export declare const EditUserDocument: Apollo.DocumentNode;
export type EditUserMutationFn = Apollo.MutationFunction<
  EditUserMutation,
  EditUserMutationVariables
>;
export declare function useEditUserMutation(
  baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>,
): Apollo.MutationTuple<
  EditUserMutation,
  Exact<{
    id: string;
    email?: InputMaybe<string> | undefined;
    phoneNumber?: InputMaybe<string> | undefined;
    password?: InputMaybe<string> | undefined;
    name?: InputMaybe<string> | undefined;
    address?: InputMaybe<string> | undefined;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>;
export declare const LoginDocument: Apollo.DocumentNode;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export declare function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
): Apollo.MutationTuple<
  LoginMutation,
  Exact<{
    email?: InputMaybe<string> | undefined;
    phoneNumber?: InputMaybe<string> | undefined;
    password: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export declare const PlaceOrderDocument: Apollo.DocumentNode;
export type PlaceOrderMutationFn = Apollo.MutationFunction<
  PlaceOrderMutation,
  PlaceOrderMutationVariables
>;
export declare function usePlaceOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<PlaceOrderMutation, PlaceOrderMutationVariables>,
): Apollo.MutationTuple<
  PlaceOrderMutation,
  Exact<{
    idCart: string;
    note?: InputMaybe<string> | undefined;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type PlaceOrderMutationHookResult = ReturnType<typeof usePlaceOrderMutation>;
export type PlaceOrderMutationResult = Apollo.MutationResult<PlaceOrderMutation>;
export type PlaceOrderMutationOptions = Apollo.BaseMutationOptions<
  PlaceOrderMutation,
  PlaceOrderMutationVariables
>;
export declare const RemoveFromCartDocument: Apollo.DocumentNode;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;
export declare function useRemoveFromCartMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>,
): Apollo.MutationTuple<
  RemoveFromCartMutation,
  Exact<{
    cartItemIndex: number;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>;
export declare const SignupDocument: Apollo.DocumentNode;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;
export declare function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>,
): Apollo.MutationTuple<
  SignupMutation,
  Exact<{
    registerInput?: InputMaybe<RegisterInput> | undefined;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export declare const UpdateCartItemDocument: Apollo.DocumentNode;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;
export declare function useUpdateCartItemMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>,
): Apollo.MutationTuple<
  UpdateCartItemMutation,
  Exact<{
    itemsUpdate: CartItemUpdateInput | CartItemUpdateInput[];
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables
>;
export declare const UpdateCategoryDocument: Apollo.DocumentNode;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export declare function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>,
): Apollo.MutationTuple<
  UpdateCategoryMutation,
  Exact<{
    id: string;
    category: CategoryInput;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export declare const UpdateProductDocument: Apollo.DocumentNode;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export declare function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>,
): Apollo.MutationTuple<
  UpdateProductMutation,
  Exact<{
    id: string;
    product: ProductInput;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export declare const GetCartDocument: Apollo.DocumentNode;
export declare function useGetCartQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCartQuery, GetCartQueryVariables>,
): Apollo.QueryResult<
  GetCartQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetCartQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = Apollo.QueryResult<GetCartQuery, GetCartQueryVariables>;
export declare function refetchGetCartQuery(variables?: GetCartQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
export declare const GetCategoriesDocument: Apollo.DocumentNode;
export declare function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
): Apollo.QueryResult<
  GetCategoriesQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetCategoriesQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export declare function refetchGetCategoriesQuery(variables?: GetCategoriesQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
export declare const GetCategoryDocument: Apollo.DocumentNode;
export declare function useGetCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>,
): Apollo.QueryResult<
  GetCategoryQuery,
  Exact<{
    id: string;
  }>
>;
export declare function useGetCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetCategoryQuery,
  Exact<{
    id: string;
  }>
>;
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<
  GetCategoryQuery,
  GetCategoryQueryVariables
>;
export declare function refetchGetCategoryQuery(variables: GetCategoryQueryVariables): {
  query: Apollo.DocumentNode;
  variables: Exact<{
    id: string;
  }>;
};
export declare const GetOrderDocument: Apollo.DocumentNode;
export declare function useGetOrderQuery(
  baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
): Apollo.QueryResult<
  GetOrderQuery,
  Exact<{
    id: string;
  }>
>;
export declare function useGetOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetOrderQuery,
  Exact<{
    id: string;
  }>
>;
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export declare function refetchGetOrderQuery(variables: GetOrderQueryVariables): {
  query: Apollo.DocumentNode;
  variables: Exact<{
    id: string;
  }>;
};
export declare const GetOrdersDocument: Apollo.DocumentNode;
export declare function useGetOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>,
): Apollo.QueryResult<
  GetOrdersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetOrdersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export declare function refetchGetOrdersQuery(variables?: GetOrdersQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
export declare const GetProductDocument: Apollo.DocumentNode;
export declare function useGetProductQuery(
  baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>,
): Apollo.QueryResult<
  GetProductQuery,
  Exact<{
    id: string;
  }>
>;
export declare function useGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetProductQuery,
  Exact<{
    id: string;
  }>
>;
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export declare function refetchGetProductQuery(variables: GetProductQueryVariables): {
  query: Apollo.DocumentNode;
  variables: Exact<{
    id: string;
  }>;
};
export declare const GetProductsDocument: Apollo.DocumentNode;
export declare function useGetProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
): Apollo.QueryResult<
  GetProductsQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetProductsQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export declare function refetchGetProductsQuery(variables?: GetProductsQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
export declare const GetUserDocument: Apollo.DocumentNode;
export declare function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
): Apollo.QueryResult<
  GetUserQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetUserQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export declare function refetchGetUserQuery(variables?: GetUserQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
export declare const GetUsersDocument: Apollo.DocumentNode;
export declare function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
): Apollo.QueryResult<
  GetUsersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
): Apollo.LazyQueryResultTuple<
  GetUsersQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export declare function refetchGetUsersQuery(variables?: GetUsersQueryVariables): {
  query: Apollo.DocumentNode;
  variables:
    | Exact<{
        [key: string]: never;
      }>
    | undefined;
};
