# Terraform configuration to set up providers by version.
terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}

# Configures the provider to use the resource block's specified project for quota checks.
provider "google-beta" {
  user_project_override = true
}

provider "google-beta" {
  alias = "no_user_project_override"
  user_project_override = false
}


# Creates a new Google Cloud project.
resource "google_project" "default" {
  provider   = google-beta.no_user_project_override

  name       = "Qr-Menu-App"
  project_id = "qr-menu-app-308014"

  # Required for the project to display in any list of Firebase projects.
  labels = {
    "firebase" = "enabled"
  }
}

# Enables required APIs.
resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = google_project.default.project_id
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    # Enabling the ServiceUsage API allows the new project to be quota checked from now on.
    "serviceusage.googleapis.com",
  ])
  service = each.key

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}

# Enables Firebase services for the new project created above.
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  # Waits for the required APIs to be enabled.
  depends_on = [
    google_project_service.default
  ]
}

# Creates a Firebase Web App in the new project created above.
resource "google_firebase_web_app" "basic" {
    provider = google-beta
    project = google_project.default.project_id
    display_name = "QR Menu App"
    deletion_policy = "DELETE"

    depends_on = [google_firebase_project.default]
}


# Enables Firebase services for the new project created above.
resource "google_firebase_project" "auth" {
  provider = google-beta
  project  = google_project.default.project_id

  depends_on = [
    google_project_service.default,
  ]
}

# Creates an Identity Platform config.
# Also enables Firebase Authentication with Identity Platform in the project if not.
resource "google_identity_platform_config" "auth" {
  provider = google-beta
  project  = google_project.default.project_id


  # Wait for identitytoolkit.googleapis.com to be enabled before initializing Authentication.
  depends_on = [
    google_project_service.default,
  ]
}

# Adds more configurations, like for the email/password sign-in provider.
resource "google_identity_platform_project_default_config" "auth" {
  provider = google-beta
  project  = google_project.default.project_id
  sign_in {
    allow_duplicate_emails = false

    anonymous {
      enabled = true
    }

    email {
      enabled           = true
      password_required = false
    }
  }

  # Wait for Authentication to be initialized before enabling email/password.
  depends_on = [
    google_identity_platform_config.auth
  ]
}

# Commented out as it requries a Blaze firebase account (paid)
# Manually created on firebase for now
#
# # Creates an Identity Platform default supported IDP config.
# resource "google_identity_platform_default_supported_idp_config" "idp_config" {
#   project  = google_project.default.project_id
#   enabled       = true
#   idp_id        = "playgames.google.com"
#   client_id     = "${var.google_client_id}"
#   client_secret = "${var.google_secret_id}"
# }