'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { TextEditor } from '@/components/core/text-editor/text-editor';

import { FileDropzone } from './file-dropzone';
import { ProductImage } from './product-image';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error('Error converting file to base64'));
    };
  });
}

const schema = zod.object({
  name: zod.string().min(1, 'Name is required').max(255),
  category: zod.string().min(1, 'Gategory is required').max(255),
  brand: zod.string().min(1, 'Brand is required').max(255),
  description: zod.string().min(1, 'Description is required').max(2000),
  images: zod.array(zod.object({ id: zod.string(), url: zod.string(), fileName: zod.string() })),
  metadata: zod.array(zod.object({ id: zod.string(), key: zod.string(), value: zod.string() })),
  type: zod.string().min(1, 'Type is required').max(255),
  sku: zod.string().max(255).optional(),
  barcode: zod.string().max(255).optional(),
  weight: zod.number().min(0, 'Width must be greater than or equal to 0').nullable(),
  volume: zod.number().min(0, 'Volume must be greater than or equal to 0').nullable(),
  depth: zod.number().min(0, 'Depth must be greater than or equal to 0').nullable(),
  width: zod.number().min(0, 'Width must be greater than or equal to 0').nullable(),
  height: zod.number().min(0, 'Height must be greater than or equal to 0').nullable(),
  pricingModel: zod.string().min(1, 'Pricing model is required').max(255),
  currency: zod.string().min(1, 'Currency is required').max(255),
  price: zod.number().min(0, 'Price must be greater than or equal to 0'),
  isRecurring: zod.boolean(),
  billingCycle: zod.string().min(1, 'Billing cycle is required').max(255),
});

const defaultValues = {
  name: '',
  category: '',
  brand: '',
  description: '',
  images: [],
  metadata: [{ id: 'META-1', key: '', value: '' }],
  type: 'physical',
  sku: '',
  barcode: '',
  weight: null,
  volume: null,
  depth: null,
  width: null,
  height: null,
  pricingModel: 'standard',
  currency: 'usd',
  price: 0,
  isRecurring: true,
  billingCycle: 'monthly',
};

export function ProductCreateForm() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        // Make API request
        navigate(paths.dashboard.products.details('1'));
      } catch (err) {
        logger.error(err);
      }
    },
    [navigate]
  );

  const handleImageDrop = React.useCallback(
    async (files) => {
      // Upload images to the server

      const images = await Promise.all(
        files.map(async (file) => {
          const url = await fileToBase64(file);

          return { id: `IMG-${Date.now()}`, url, fileName: file.name };
        })
      );

      setValue('images', [...getValues('images'), ...images]);
    },
    [getValues, setValue]
  );

  const handleImageRemove = React.useCallback(
    (imageId) => {
      setValue(
        'images',
        getValues('images').filter((image) => image.id !== imageId)
      );
    },
    [getValues, setValue]
  );

  const handleMetadataAdd = React.useCallback(() => {
    setValue('metadata', [...getValues('metadata'), { id: `META-${Date.now()}`, key: '', value: '' }]);
  }, [getValues, setValue]);

  const images = watch('images');
  const metadata = watch('metadata');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack divider={<Divider />} spacing={5}>
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
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Images</FormLabel>
                <FileDropzone
                  accept={{ 'image/*': [] }}
                  caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                  onDrop={handleImageDrop}
                />
              </FormControl>
              <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                {images.map((image) => (
                  <ProductImage
                    key={image.id}
                    onDelete={() => {
                      handleImageRemove(image.id);
                    }}
                    url={image.url}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Stack spacing="4px">
                <FormLabel>Metadata</FormLabel>
                <Stack spacing={2}>
                  {metadata.map((item, index) => (
                    <Grid container key={item.id} spacing={3}>
                      <Grid md={6} xs={12}>
                        <Controller
                          control={control}
                          name={`metadata.${index}.key`}
                          render={({ field }) => <Input {...field} placeholder="Key" />}
                        />
                      </Grid>
                      <Grid md={6} xs={12}>
                        <Controller
                          control={control}
                          name={`metadata.${index}.value`}
                          render={({ field }) => <Input {...field} placeholder="Value" />}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              </Stack>
              <div>
                <Link
                  level="body-sm"
                  onClick={handleMetadataAdd}
                  startDecorator={<PlusIcon fontSize="var(--joy-fontSize-md)" weight="bold" />}
                >
                  Add More Metadata
                </Link>
              </div>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Inventory</Typography>
          <Stack spacing={3} sx={{ maxWidth: 'md' }}>
            <div>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value === 'physical'}
                    label="This is a physical product"
                    onChange={(event) => {
                      field.onChange(event.target.checked ? 'physical' : 'digital');
                    }}
                  />
                )}
              />
            </div>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="sku"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.sku)}>
                      <FormLabel>SKU</FormLabel>
                      <Input {...field} />
                      {errors.sku ? <FormHelperText>{errors.sku.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="barcode"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.barcode)}>
                      <FormLabel>Barcode</FormLabel>
                      <Input {...field} />
                      {errors.barcode ? <FormHelperText>{errors.barcode.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="weight"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.weight)}>
                      <FormLabel>Weight</FormLabel>
                      <Input
                        {...field}
                        endDecorator="kg"
                        onChange={(event) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange(null);
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        type="number"
                        value={field.value ?? ''}
                      />
                      {errors.weight ? <FormHelperText>{errors.weight.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="volume"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.volume)}>
                      <FormLabel>Volume</FormLabel>
                      <Input
                        {...field}
                        endDecorator="cm3"
                        onChange={(event) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange(null);
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        type="number"
                        value={field.value ?? ''}
                      />
                      {errors.volume ? <FormHelperText>{errors.volume.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <div>
              <FormLabel sx={{ m: '4px' }}>Dimensions</FormLabel>
              <Grid container spacing={3}>
                <Grid md={4} xs={12}>
                  <Controller
                    control={control}
                    name="depth"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.depth)}>
                        <Input
                          {...field}
                          endDecorator="cm"
                          onChange={(event) => {
                            const value = event.target.valueAsNumber;

                            if (isNaN(value)) {
                              field.onChange(null);
                              return;
                            }

                            field.onChange(parseFloat(value.toFixed(2)));
                          }}
                          placeholder="Depth"
                          type="number"
                          value={field.value ?? ''}
                        />
                        {errors.depth ? <FormHelperText>{errors.depth.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={4} xs={12}>
                  <Controller
                    control={control}
                    name="width"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.width)}>
                        <Input
                          {...field}
                          endDecorator="cm"
                          onChange={(event) => {
                            const value = event.target.valueAsNumber;

                            if (isNaN(value)) {
                              field.onChange(null);
                              return;
                            }

                            field.onChange(parseFloat(value.toFixed(2)));
                          }}
                          placeholder="Width"
                          type="number"
                          value={field.value ?? ''}
                        />
                        {errors.width ? <FormHelperText>{errors.width.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={4} xs={12}>
                  <Controller
                    control={control}
                    name="height"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.height)}>
                        <Input
                          {...field}
                          endDecorator="cm"
                          onChange={(event) => {
                            const value = event.target.valueAsNumber;

                            if (isNaN(value)) {
                              field.onChange(null);
                              return;
                            }

                            field.onChange(parseFloat(value.toFixed(2)));
                          }}
                          placeholder="Height"
                          type="number"
                          value={field.value ?? ''}
                        />
                        {errors.height ? <FormHelperText>{errors.height.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Pricing</Typography>
          <Stack spacing={3} sx={{ maxWidth: 'md' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="pricingModel"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.pricingModel)}>
                      <FormLabel>Pricing Model</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="standard">Standard Pricing</Option>
                        <Option value="package">Package Pricing</Option>
                        <Option value="graduated">Graduated Pricing</Option>
                        <Option value="volume">Volume Pricing</Option>
                      </Select>
                      {errors.pricingModel ? <FormHelperText>{errors.pricingModel.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.price)}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        {...field}
                        endDecorator={
                          <Controller
                            control={control}
                            name="currency"
                            render={({ field: innerField }) => (
                              <FormControl>
                                <Select
                                  {...innerField}
                                  onChange={(_, value) => {
                                    innerField.onChange(value);
                                  }}
                                  size="sm"
                                  variant="plain"
                                >
                                  <Option value="usd">USD</Option>
                                  <Option value="eur">EUR</Option>
                                </Select>
                              </FormControl>
                            )}
                          />
                        }
                        onChange={(event) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange('');
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        placeholder="0.00"
                        slotProps={{ input: { lang: 'en', min: 0, step: 0.01 } }}
                        startDecorator="$"
                        sx={{
                          pr: 0,
                          '& .MuiInput-endDecorator': { borderLeft: '1px solid var(--joy-palette-divider)', p: '4px' },
                        }}
                        type="number"
                        value={field.value}
                      />
                      {errors.price ? <FormHelperText>{errors.price.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <div>
              <Controller
                control={control}
                name="isRecurring"
                render={({ field }) => (
                  <Stack direction="row" spacing={2}>
                    <Button
                      color={field.value ? 'primary' : 'neutral'}
                      onClick={() => {
                        field.onChange(true);
                      }}
                      size="sm"
                      variant="outlined"
                    >
                      Recurring
                    </Button>
                    <Button
                      color={field.value ? 'neutral' : 'primary'}
                      onClick={() => {
                        field.onChange(false);
                      }}
                      size="sm"
                      variant="outlined"
                    >
                      One Time
                    </Button>
                  </Stack>
                )}
              />
            </div>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.billingCycle)}>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      >
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="yearly">Yearly</Option>
                      </Select>
                      {errors.billingCycle ? <FormHelperText>{errors.billingCycle.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" type="submit" variant="outlined">
            Save as Draft
          </Button>
          <Button type="submit">Publish</Button>
        </Stack>
      </Stack>
    </form>
  );
}
