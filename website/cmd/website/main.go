package main

import (
	"html/template"
	"io"
	"log"
	"net/http"

	"github.com/siuyin/birds-of-a-feather/cmd/website/internal/public"
	"github.com/siuyin/dflt"
)

type tmplDat struct {
	Body string
	JS   string
}

var (
	tmpl *template.Template
)

func init() {
}

func main() {
	depl := dflt.EnvString("DEPLOY", "DEV")
	if depl == "DEV" {
		tmpl = template.Must(template.ParseGlob("./internal/public/*.html"))
		http.Handle("/", http.FileServer(http.Dir("./internal/public"))) // DEV
	} else {
		tmpl = template.Must(template.ParseFS(public.Content, "*.html"))
		http.Handle("/", http.FileServer(http.FS(public.Content))) // PROD
	}

	http.HandleFunc("/{$}", indexFunc)

	log.Println("starting web server")
	log.Fatal(http.ListenAndServe(":"+dflt.EnvString("HTTP_PORT", "8080"), nil))
}

// ------------------------------------------------

func indexFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "main", JS: "/main.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}
