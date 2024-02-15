use std::time::{Duration, UNIX_EPOCH};
use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use leptos_use::use_timestamp;
use chrono::{TimeZone, Utc};

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/countdown.css"/>
            <Router>
                <Routes>
                    <Route path="/" view=HomePage/>
                    <Route path="/:else" view=ErrorPage/>
                </Routes>
            </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {

    let timestamp = use_timestamp();

    let diff_signal = create_rw_signal("".to_string());

    create_effect(move |_| {
        let dt = Utc.ymd(2024, 4, 5).and_hms(0, 0, 0);
        let april_milli = dt.timestamp_millis() as f64;
        let diff = april_milli - timestamp.get();
        logging::log!("{}", format!("{}", diff));

        let total_seconds = (diff / 1000.0).floor() as i64;
        let days = total_seconds / 86400; // Total seconds in a day
        let hours = (total_seconds % 86400) / 3600;
        let minutes = (total_seconds % 3600) / 60;
        let seconds = total_seconds % 60;

        let formatted_diff = format!(
            "{} days, {} hours, {} minutes, {} seconds",
            days, hours, minutes, seconds
        );

        diff_signal.set(formatted_diff);
    });

    view! {
        <main class="bg-[#EEBCC6] text-black text-center h-screen flex flex-col items-center justify-center w-full space-y-8 font-robotomono">
            <p>{move || {diff_signal.get()}}</p>
        </main>
    }
}

#[component]
fn ErrorPage() -> impl IntoView {
    let params = use_params_map();
    let p_unknown = move || params.with(|p| p.get("else").cloned().unwrap_or_default());

    let unknown = p_unknown();

    view! {
        <main class=format!("h-screen w-full flex flex-col items-center justify-center font-robotomono")>
            <p class="">Unknown command: {unknown}</p>
        </main>
    }
}
