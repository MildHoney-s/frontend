import Iconify from '@/components/iconify'
import { useResponsive } from '@/hooks/use-responsive'
import { bgBlur } from '@/theme/css'
import { UserInformationProps } from '@/utils/global-interface'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import { SxProps, Theme, useTheme } from '@mui/material/styles'

import AccountPopover from './common/account-popover'
import LanguagePopover from './common/language-popover'
import { HEADER, NAV } from './config-layout'

interface HeaderProps {
  information: UserInformationProps | null
  onOpenNav: () => void
}

// ----------------------------------------------------------------------

export default function Header({ information, onOpenNav }: HeaderProps) {
  const theme = useTheme()

  const lgUp = useResponsive('up', 'lg')

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={3}>
        <LanguagePopover />
        <AccountPopover information={information} />
      </Stack>
    </>
  )

  return (
    <AppBar
      sx={
        {
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        } as SxProps<Theme>
      }
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}
