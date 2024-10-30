import client from "@/hooks/useGenerateClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const directoryApi = {
  fetchDirectory: createAsyncThunk("directory/fetchDirectory", async () => {
    const { data } = await client?.models.Directory.list();
    return data;
  }),
  fetchDirectoryById: createAsyncThunk(
    "directory/fetchDirectoryById",
    async (id: string) => {
      const { data } = await client?.models.Directory.get({ id });
      return data;
    }
  ),
  createDirectory: createAsyncThunk(
    "directory/createDirectory",
    async (newEntity: any) => {
      const { data } = await client?.models.Directory.create(newEntity);
      return { data, message: "Directory created successfully" };
    }
  ),
  updateDirectory: createAsyncThunk(
    "directory/updateDirectory",
    async (updatedEntity: any) => {
      const { data } = await client?.models.Directory.update(updatedEntity);
      return { data, message: "Directory updated successfully" };
    }
  ),
  deleteDirectory: createAsyncThunk(
    "directory/deleteDirectory",
    async (id: string) => {
      const { data } = await client?.models.Directory.delete({ id });
      return { data, message: "Directory deleted successfully" };
    }
  ),
};

export interface CounterState {
  directory: any[];
  isLoading: boolean;
  error: string | null;
  singleDirectory: any;
}

const initialState: CounterState = {
  directory: [],
  isLoading: false,
  error: null,
  singleDirectory: null,
};

export const direactorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<any[]>) => {
      console.log(action.payload, "payload");
      state.directory = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(directoryApi.fetchDirectory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(directoryApi.fetchDirectory.fulfilled, (state, action) => {
        state.directory = action.payload;
        state.isLoading = false;
      })
      .addCase(directoryApi.fetchDirectory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "";
      })
      .addCase(directoryApi.fetchDirectoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(directoryApi.fetchDirectoryById.fulfilled, (state, action) => {
        state.singleDirectory = action.payload;
        state.isLoading = false;
      })
      .addCase(directoryApi.fetchDirectoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "";
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setError, setLoading } = direactorySlice.actions;

export default direactorySlice.reducer;
