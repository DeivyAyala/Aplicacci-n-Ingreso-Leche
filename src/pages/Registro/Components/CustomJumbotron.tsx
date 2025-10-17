interface props {
    title: string,
    subtitle?: string,
}

export const CustomJumbotron = ({title, subtitle}: props) => {
  return (
     <div className={`bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border`}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-balance">{title}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
