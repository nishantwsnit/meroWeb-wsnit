import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import client from "@/hooks/useGenerateClient";
import { ApiResponse, DeleteRequest } from "@/interface";
import { CategoryType } from "@/types/categoryType";
import { CategoryCreateFormInputValues } from "@/ui-components/CategoryCreateForm";
import { CategoryUpdateFormInputValues } from "@/ui-components/CategoryUpdateForm";
import { v4 as uuidv4 } from "uuid";

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await client?.models.Category.list();
    return response.data;
  }
);

// Fetch a category by ID
export const fetchCategoriesById = createAsyncThunk(
  "categories/fetchCategoriesById",
  async (id: string) => {
    const { data } = await client?.models.Category.get({ categoryId: id });
    return data;
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({
    newEntity,
    onSuccess,
    onError,
  }: {
    newEntity: CategoryCreateFormInputValues;
    onSuccess?: (response: ApiResponse<CategoryType>) => void;
    onError?: (error: any) => void;
  }) => {
    try {
      const data = Object.fromEntries(
        Object.entries(newEntity).filter(([_, v]) => v !== null)
      ) as CategoryCreateFormInputValues;

      const { data: result, errors } = await client.models.Category.create({
        categoryId: uuidv4(),
        description: data?.description as string,
        name: data?.name as string,
        iconName: data?.iconName as string,
        iconType: data?.iconType as string,
      });

      if (errors) throw errors;

      const response: ApiResponse<CategoryType> = {
        data: result as any,
        message: "Category created successfully",
        status: 200,
      };

      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  }
);

// Update an existing category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    id,
    updatedCategory,
    onSuccess,
    onError,
  }: {
    id: string;
    updatedCategory: CategoryUpdateFormInputValues;
    onSuccess?: (response: ApiResponse<CategoryType>) => void;
    onError?: (error: any) => void;
  }) => {
    try {
      const value = Object.fromEntries(
        Object.entries(updatedCategory).filter(([_, v]) => v !== null)
      ) as CategoryUpdateFormInputValues;

      const { data } = await client?.models.Category.update({
        categoryId: id,
        ...value,
      });

      // Assuming response contains success data
      const apiResponse: ApiResponse<CategoryType> = {
        data: data as any,
        message: "Category updated successfully",
        status: 200,
      };

      // Call the onSuccess callback if provided
      onSuccess?.(apiResponse);

      return apiResponse; // Return the response for the fulfilled case
    } catch (error) {
      // Call the onError callback if provided
      onError?.(error);
      throw error; // Rethrow the error to be handled by the rejected case
    }
  }
);

// Delete a category by ID
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ id, onSuccess, onError }: DeleteRequest) => {
    try {
      const { data, errors } = await client.models.Category.delete({
        categoryId: id,
      });

      if (errors) throw errors;

      const response: ApiResponse<null> = {
        data: data as any,
        message: "Category deleted successfully",
        status: 200,
      };

      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  }
);

export interface CategoryState {
  category: CategoryType[];
  isLoading: boolean;
  error: any;
  categoryById: CategoryType | null;
}

const initialState: CategoryState = {
  category: [],
  isLoading: false,
  error: null,
  categoryById: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryType[]>) => {
      state.category = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category = action.payload as any;
        state.isLoading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Fetch category by ID
    builder
      .addCase(fetchCategoriesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoriesById.fulfilled, (state, action) => {
        state.categoryById = action.payload as any;
        state.isLoading = false;
      })
      .addCase(fetchCategoriesById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category.push(action.payload.data);
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (cat) => cat.categoryId !== action.meta.arg.id
        );
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setError, setLoading } = categorySlice.actions;

export default categorySlice.reducer;
