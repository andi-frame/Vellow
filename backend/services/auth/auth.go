package Auth

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	key    = "secret"
	MaxAge = 86400 * 30
	IsProd = false
)

func NewAuth() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	gogleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	googleClienSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(MaxAge)

	store.Options = &sessions.Options{
		Path:     "/",
		Domain:   "localhost",
		MaxAge:   MaxAge,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	}

	gothic.Store = store
	goth.UseProviders(
		google.New(gogleClientID, googleClienSecret, "http://localhost:8080/auth/google/callback"),
	)
}
