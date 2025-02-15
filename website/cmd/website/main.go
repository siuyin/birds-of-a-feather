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
	http.HandleFunc("/registry", registryFunc)
	http.HandleFunc("/ideator", ideatorFunc)
	http.HandleFunc("/facilitator", facilitatorFunc)
	http.HandleFunc("/logistics", logisticsFunc)
	http.HandleFunc("/admin", adminFunc)

	log.Println("starting web server")
	log.Fatal(http.ListenAndServe(":"+dflt.EnvString("HTTP_PORT", "8080"), nil))
}

// ------------------------------------------------

func indexFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "main", JS: "/main.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}

func registryFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "registry", JS: "/registry.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}

func ideatorFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "ideator", JS: "/ideator.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}
func adminFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "admin", JS: "/admin.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}
func facilitatorFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "facilitator", JS: "/facilitator.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}
func logisticsFunc(w http.ResponseWriter, _ *http.Request) {
	if err := tmpl.ExecuteTemplate(w, "main.html", tmplDat{Body: "logistics", JS: "/logitics.js"}); err != nil {
		io.WriteString(w, err.Error())
	}
}