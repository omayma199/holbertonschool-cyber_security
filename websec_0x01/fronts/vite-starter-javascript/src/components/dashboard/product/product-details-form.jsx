'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { logger } from '@/lib/default-logger';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  name: zod.string().min(1, 'Name is required').max(255),
  category: zod.string().min(1, 'Gategory is required').max(255),
  brand: zod.string().min(1, 'Brand is required').max(255),
  description: zod.string().min(1, 'Description is required').max(2000),
});

const defaultValues = {
  name: 'Puma XForce Sneakers',
  category: 'shoes',
  brand: 'puma',
  description:
    "<p>Elevate your running game with the Puma FlexRide Men's Running Shoes, designed to provide the perfect blend of style, comfort, and performance. Whether you're hitting the track, pounding the pavement, or simply strolling through the city, these shoes are your ideal companion.</p><h5>Features</h5><ul><li><b>Optimized Flexibility</b>: The FlexRide technology in these shoes ensures that your every step feels natural and effortless. </li><li><b>Sleek and Stylish</b>: Puma's iconic design elements are showcased in these shoes, making them a fashion statement on and off the track. </li></ul><p>Order yours today and experience the difference in every step. It's time to unleash your inner athlete with Puma!</p>",
};

export function ProductDetialsForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (_) => {
    try {
      // Make API request
      toast.success('Product details updated');
    } catch (err) {
      logger.error(err);
    }
  }, []);

  const editorRef = React.useRef(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography level="h4">Information</Typography>
        <Stack spacing={3} sx={{ maxWidth: 'md' }}>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.name)}>
                    <FormLabel>Display Name</FormLabel>
                    <Input {...field} />
                    {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.category)}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                    >
                      <Option value="">Choose a category</Option>
                      <Option value="clothing">Clothing</Option>
                      <Option value="shoes">Shoes</Option>
                      <Option value="accessories">Accessories</Option>
                    </Select>
                    {errors.category ? <FormHelperText>{errors.category.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="brand"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.brand)}>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                    >
                      <Option value="">Choose a brand</Option>
                      <Option value="puma">Puma</Option>
                      <Option value="nike">Nike</Option>
                      <Option value="adidas">Adidas</Option>
                    </Select>
                    {errors.brand ? <FormHelperText>{errors.brand.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ '& .tiptap-container': { height: '300px' } }}>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <FormControl error={Boolean(errors.description)}>
                  <FormLabel>Description</FormLabel>
                  <TextEditor
                    content={field.value}
                    onCreate={({ editor }) => {
                      editorRef.current = editor;
                    }}
                    onUpdate={({ editor }) => {
                      field.onChange(editor.getHTML());
                    }}
                    placeholder="Write something"
                  />
                  {errors.description ? <FormHelperText>{errors.description.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            color="neutral"
            onClick={() => {
              reset();
              // Form reset doesn't reset the text editor
              editorRef.current?.commands.setContent(defaultValues.description);
            }}
            variant="outlined"
          >
            Discard
          </Button>
          <Button type="submit">Save Changes</Button>
        </Stack>
      </Stack>
    </form>
  );
}
