import { createTheme } from '@mantine/core';


export const theme = createTheme({
  primaryShade: 6,
  primaryColor: 'teal',
  components: {
    Button: {
      styles: (theme: { black: any }, params: { variant: string }) => ({
        root: {
          ...(params.variant === 'outline' && {
            color: theme.black,
          }),
        },
      }),
    },
  },
});
