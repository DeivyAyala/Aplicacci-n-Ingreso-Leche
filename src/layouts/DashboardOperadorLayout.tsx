import { OperatorLayout } from "@/pages/Operator/OperatorLayout"

interface Props {
  role: string
  userName?: string
}

export const DashboardOperadorLayout = ({ role, userName }: Props) => {
  return <OperatorLayout role={role} userName={userName} />
}
