import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface propsFirma {
    user: string
    date: string
    time: string
}

export const Firma = ( {user, date, time}: propsFirma ) => {
  return (
    <div>
        {user && (
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Firma Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 font-medium">{user}</p>
                  <p className="text-xs text-amber-600 mt-1">
                    Firmado el {date} a las {time}
                  </p>
                </div>
              </CardContent>
            </Card>
        )}
    </div>
  )
}
